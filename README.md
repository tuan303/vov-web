<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1zOtKvxVJdBhlOHbw_r3u8WlMkTgv8lTP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Firebase Hosting

### 1) Create a Firebase project

- Go to https://console.firebase.google.com/
- Create a new project and note the **Project ID**

### 2) Configure this repo for Hosting (already scaffolded)

This repo includes:

- `firebase.json` (serves `dist` + SPA rewrite to `index.html`)
- `.firebaserc` (set your Firebase Project ID)

Update `.firebaserc`:

- Replace `YOUR_FIREBASE_PROJECT_ID` with your real project id

### 3) Deploy

Run:

1. `npm install`
2. `npm run firebase:login`
3. `npm run firebase:deploy`

After deploy finishes, Firebase will print your Hosting URL.

## Contact form: Send Inquiry emails

The "Send Inquiry" form posts to `/api/sendInquiry`, which is a Firebase Cloud Function rewrite. To actually send email, you must configure SMTP credentials for the function.

### 1) Set SMTP config (required)

Run (replace values):

`npx --yes firebase-tools functions:config:set smtp.host="YOUR_SMTP_HOST" smtp.port="587" smtp.user="YOUR_SMTP_USER" smtp.pass="YOUR_SMTP_PASSWORD" smtp.from="VOV Smart <admin@vovsmart.net>"`

Common SMTP ports: `587` (STARTTLS) or `465` (SSL).

### 2) Deploy (Hosting + Functions)

`npm run firebase:deploy`

### Notes

- If you use Gmail/Google Workspace, you typically need an **App Password** (not your normal password).
- Without SMTP config, the API will return an error and no email will be sent.

### Note about API keys

If you provide `GEMINI_API_KEY` to a frontend build, it becomes part of the shipped JavaScript and is **not a secret**. For production use, consider moving Gemini calls to a backend (Cloud Functions/Cloud Run) and keep the key server-side.
