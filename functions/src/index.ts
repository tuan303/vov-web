import cors from 'cors';
import * as functions from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import * as https from 'https';

const corsHandler = cors({ origin: true });
const graphClientSecret = defineSecret('GRAPH_CLIENT_SECRET');
const graphTenant = '66247161-c89d-4a72-b755-07bacb26bf94';
const graphClientId = '0e0f2a0f-1c24-4b5a-b706-2ecca5941a1c';
const graphSender = 'admin@vovsmart.net';
const graphRecipient = 'tuan303@gmail.com';

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

const getGraphAccessToken = async (graph: { tenant: string; clientid: string; clientsecret: string }) => {
  const params = new URLSearchParams({
    client_id: graph.clientid,
    client_secret: graph.clientsecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials'
  });

  const response = await httpsRequest(
    `https://login.microsoftonline.com/${graph.tenant}/oauth2/v2.0/token`,
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

export const sendInquiry = functions
  .runWith({ secrets: [graphClientSecret] })
  .region('us-central1')
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ ok: false, error: 'Method Not Allowed' });
        return;
      }

      const payload = (req.body ?? {}) as InquiryPayload;

      const name = (payload.name ?? '').toString().trim().slice(0, 120);
      const email = (payload.email ?? '').toString().trim().slice(0, 200);
      const message = (payload.message ?? '').toString().trim().slice(0, 5000);

      if (!name || !email || !message) {
        res.status(400).json({ ok: false, error: 'Missing required fields' });
        return;
      }

      const tenant = graphTenant.trim();
      const clientid = graphClientId.trim();
      const clientsecret = graphClientSecret.value().trim();
      const sender = graphSender.trim();
      const recipient = graphRecipient.trim();

      if (!tenant || !clientid || !clientsecret || !sender || !recipient) {
        res.status(500).json({
          ok: false,
          error: 'Email service is not configured. Set graph.tenant/clientid/clientsecret/sender/recipient.'
        });
        return;
      }

      try {
        const accessToken = await getGraphAccessToken({ tenant, clientid, clientsecret });
        await sendGraphMail({
          accessToken,
          sender,
          recipient,
          replyTo: email,
          subject: `New inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });
      } catch (err) {
        console.error('Failed to send inquiry via Microsoft Graph', err);
        res.status(500).json({ ok: false, error: 'Failed to send inquiry email' });
        return;
      }

      res.json({ ok: true });
    });
  });
