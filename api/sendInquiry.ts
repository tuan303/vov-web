import type { IncomingMessage, ServerResponse } from 'http';
import https from 'https';

type InquiryPayload = {
  name?: string;
  email?: string;
  message?: string;
};

type GraphTokenResponse = {
  access_token?: string;
};

type HttpsResponse = {
  statusCode: number;
  body: string;
};

type RequestWithBody = IncomingMessage & {
  body?: InquiryPayload;
};

const json = (res: ServerResponse, statusCode: number, body: unknown) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const readJsonBody = async (req: RequestWithBody): Promise<InquiryPayload> => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString('utf8').trim();
  if (!rawBody) {
    return {};
  }

  return JSON.parse(rawBody) as InquiryPayload;
};

const httpsRequest = (url: string, body: string, headers: Record<string, string>): Promise<HttpsResponse> => {
  return new Promise((resolve, reject) => {
    const request = https.request(url, { method: 'POST', headers }, (response) => {
      let data = '';

      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve({ statusCode: response.statusCode ?? 0, body: data });
      });
    });

    request.on('error', reject);
    request.write(body);
    request.end();
  });
};

const getGraphAccessToken = async () => {
  const tenantId = process.env.MS_GRAPH_TENANT_ID?.trim();
  const clientId = process.env.MS_GRAPH_CLIENT_ID?.trim();
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET?.trim();

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Microsoft Graph credentials are not configured.');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  });

  const response = await httpsRequest(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    params.toString(),
    { 'Content-Type': 'application/x-www-form-urlencoded' }
  );

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`Microsoft token request failed with status ${response.statusCode}: ${response.body}`);
  }

  const token = JSON.parse(response.body) as GraphTokenResponse;
  if (!token.access_token) {
    throw new Error('Microsoft token response did not include an access token.');
  }

  return token.access_token;
};

const sendGraphMail = async ({
  accessToken,
  sender,
  recipient,
  replyTo,
  subject,
  text
}: {
  accessToken: string;
  sender: string;
  recipient: string;
  replyTo: string;
  subject: string;
  text: string;
}) => {
  const body = JSON.stringify({
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: text
      },
      toRecipients: [{ emailAddress: { address: recipient } }],
      replyTo: [{ emailAddress: { address: replyTo } }]
    },
    saveToSentItems: true
  });

  const response = await httpsRequest(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    body,
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  );

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`Microsoft Graph sendMail failed with status ${response.statusCode}: ${response.body}`);
  }
};

export default async function handler(req: RequestWithBody, res: ServerResponse) {
  if (req.method !== 'POST') {
    json(res, 405, { ok: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = await readJsonBody(req);

    const name = (payload.name ?? '').toString().trim().slice(0, 120);
    const email = (payload.email ?? '').toString().trim().slice(0, 200);
    const message = (payload.message ?? '').toString().trim().slice(0, 5000);

    if (!name || !email || !message) {
      json(res, 400, { ok: false, error: 'Missing required fields' });
      return;
    }

    const sender = process.env.MS_GRAPH_SENDER?.trim();
    const recipient = process.env.CONTACT_RECIPIENT?.trim();

    if (!sender || !recipient) {
      json(res, 500, { ok: false, error: 'Email service is not configured.' });
      return;
    }

    const accessToken = await getGraphAccessToken();
    await sendGraphMail({
      accessToken,
      sender,
      recipient,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    json(res, 200, { ok: true });
  } catch (err) {
    console.error('Failed to send contact inquiry', err);
    json(res, 500, { ok: false, error: 'Failed to send inquiry email' });
  }
}
