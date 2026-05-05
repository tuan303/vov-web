import cors from 'cors';
import nodemailer from 'nodemailer';
import * as functions from 'firebase-functions';

const corsHandler = cors({ origin: true });

type InquiryPayload = {
  name?: string;
  email?: string;
  message?: string;
};

type SmtpConfig = {
  host?: string;
  port?: string;
  user?: string;
  pass?: string;
  from?: string;
};

export const sendInquiry = functions.region('us-central1').https.onRequest((req, res) => {
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

    const smtp = (functions.config()?.smtp ?? {}) as SmtpConfig;
    const smtpHost = smtp.host?.trim();
    const smtpPort = Number((smtp.port ?? '').toString().trim());
    const smtpUser = smtp.user?.trim();
    const smtpPass = smtp.pass?.trim();
    const smtpFrom = smtp.from?.trim();

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
      res.status(500).json({
        ok: false,
        error:
          'Email service is not configured. Set smtp.host/smtp.port/smtp.user/smtp.pass/smtp.from via firebase functions:config:set.'
      });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const adminTo = 'admin@vovsmart.net';

    await transporter.sendMail({
      from: smtpFrom,
      to: adminTo,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    res.json({ ok: true });
  });
});
