import type { IncomingMessage, ServerResponse } from 'http';
import https from 'https';

type InquiryPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  lang?: unknown;
  hp_field?: unknown;
};

type GraphTokenResponse = {
  access_token?: string;
};

type HttpsResponse = {
  statusCode: number;
  body: string;
};

type RequestWithBody = IncomingMessage & {
  body?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const asText = (value: unknown, maxLength: number) =>
  (typeof value === 'string' ? value : '').trim().slice(0, maxLength);

/** Gửi từ trình duyệt không chạy JavaScript (biểu mẫu thường) thì chuyển hướng về trang, kèm thông báo */
const redirectToPage = (res: ServerResponse, lang: string, ok: boolean) => {
  res.statusCode = 303;
  res.setHeader('Location', `${lang === 'vi' ? '/vi' : '/'}#${ok ? 'contact-sent' : 'contact-failed'}`);
  res.end();
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatMessageHtml = (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br>');

const json = (res: ServerResponse, statusCode: number, body: unknown) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const readBody = async (req: RequestWithBody): Promise<{ payload: InquiryPayload; isFormPost: boolean }> => {
  const contentType = String(req.headers['content-type'] ?? '').toLowerCase();
  const isFormPost = contentType.includes('application/x-www-form-urlencoded');

  // Vercel thường đã tự phân tích body thành object
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return { payload: req.body as InquiryPayload, isFormPost };
  }

  let rawBody = '';
  if (typeof req.body === 'string') {
    rawBody = req.body;
  } else if (Buffer.isBuffer(req.body)) {
    rawBody = req.body.toString('utf8');
  } else {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    rawBody = Buffer.concat(chunks).toString('utf8');
  }

  rawBody = rawBody.trim();
  if (!rawBody) {
    return { payload: {}, isFormPost };
  }
  if (isFormPost) {
    return { payload: Object.fromEntries(new URLSearchParams(rawBody)), isFormPost };
  }
  const parsed: unknown = JSON.parse(rawBody);
  const payload = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as InquiryPayload) : {};
  return { payload, isFormPost };
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
  text,
  html
}: {
  accessToken: string;
  sender: string;
  recipient: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) => {
  const body = JSON.stringify({
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: html
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

  let payload: InquiryPayload;
  let isFormPost = false;
  try {
    ({ payload, isFormPost } = await readBody(req));
  } catch {
    json(res, 400, { ok: false, error: 'Invalid request body' });
    return;
  }

  const lang = payload.lang === 'vi' ? 'vi' : 'en';
  const reply = (statusCode: number, body: { ok: boolean; error?: string }) =>
    isFormPost ? redirectToPage(res, lang, body.ok) : json(res, statusCode, body);

  // Ô bẫy chống thư rác có dữ liệu → máy tự động gửi: báo thành công nhưng không gửi email
  if (asText(payload.hp_field, 200)) {
    reply(200, { ok: true });
    return;
  }

  try {
    const name = asText(payload.name, 120);
    const email = asText(payload.email, 200);
    const message = asText(payload.message, 5000);

    if (!name || !email || !message) {
      reply(400, { ok: false, error: 'Missing required fields' });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      reply(400, { ok: false, error: 'Invalid email address' });
      return;
    }

    const sender = process.env.MS_GRAPH_SENDER?.trim();
    const recipient = process.env.CONTACT_RECIPIENT?.trim();

    if (!sender || !recipient) {
      reply(500, { ok: false, error: 'Email service is not configured.' });
      return;
    }

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    const pageLabel = lang === 'vi' ? 'Vietnamese (/vi)' : 'English (/)';
    const plainText = `New website inquiry - VOV Smart

Name: ${name}
Email: ${email}
Page: ${pageLabel}
Submitted: ${submittedAt} (GMT+7)

Message:
${message}`;
    const html = `
      <!doctype html>
      <html>
        <body style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fa;padding:28px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
                  <tr>
                    <td style="background:#003b5c;padding:24px 28px;color:#ffffff;">
                      <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#93c5fd;">VOV Smart Website</div>
                      <h1 style="margin:8px 0 0;font-size:24px;line-height:32px;font-weight:800;">New Contact Inquiry</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px;">
                      <p style="margin:0 0 20px;font-size:15px;line-height:24px;color:#475569;">
                        A visitor submitted the contact form on the VOV Smart website.
                      </p>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 10px;margin-bottom:22px;">
                        <tr>
                          <td style="width:120px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-right:0;border-radius:10px 0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;">Name</td>
                          <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 10px 10px 0;font-size:15px;font-weight:700;color:#0f172a;">${escapeHtml(name)}</td>
                        </tr>
                        <tr>
                          <td style="width:120px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-right:0;border-radius:10px 0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;">Email</td>
                          <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 10px 10px 0;font-size:15px;color:#0f172a;">
                            <a href="mailto:${escapeHtml(email)}" style="color:#007BFF;text-decoration:none;font-weight:700;">${escapeHtml(email)}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="width:120px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-right:0;border-radius:10px 0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;">Page</td>
                          <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 10px 10px 0;font-size:15px;color:#0f172a;">${escapeHtml(pageLabel)}</td>
                        </tr>
                        <tr>
                          <td style="width:120px;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-right:0;border-radius:10px 0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;">Submitted</td>
                          <td style="padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0 10px 10px 0;font-size:15px;color:#0f172a;">${escapeHtml(submittedAt)} GMT+7</td>
                        </tr>
                      </table>

                      <div style="margin-top:20px;">
                        <div style="margin-bottom:8px;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#64748b;">Message</div>
                        <div style="padding:18px 20px;background:#003b5c;border-radius:12px;color:#e2e8f0;font-size:16px;line-height:26px;white-space:normal;">
                          ${formatMessageHtml(message)}
                        </div>
                      </div>

                      <div style="margin-top:24px;">
                        <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#007BFF;color:#ffffff;text-decoration:none;font-size:14px;font-weight:800;padding:12px 18px;border-radius:10px;">Reply to ${escapeHtml(name)}</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:18px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:18px;">
                      VOV Smart Technology JSC - Automation, Smart Building, Smart Factory & Digitalization
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`;

    const accessToken = await getGraphAccessToken();
    await sendGraphMail({
      accessToken,
      sender,
      recipient,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: plainText,
      html
    });

    reply(200, { ok: true });
  } catch (err) {
    console.error('Failed to send contact inquiry', err);
    reply(500, { ok: false, error: 'Failed to send inquiry email' });
  }
}
