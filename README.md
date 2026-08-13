# PhishGuard Web

Modern Next.js frontend for **PhishGuard** — explainable phishing email checks.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- next-themes (light / dark)
- Resend (contact & reviews)
- Zod

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — threat awareness, AI teaser, reviews, FAQ |
| `/check` | Fast / Deep / Both email checker |
| `/how-it-works` | Plain-language model architecture |
| `/contact` | Contact + review form (Resend) |
| `/privacy` | Privacy & non-storage messaging |

## Local run

```bash
cd phishguard-web
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SVM_API_URL` — Fast Check API base URL
- `NEXT_PUBLIC_BERT_API_URL` — Deep Check API base URL
- `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `RESEND_FROM_EMAIL` — contact emails

Predictions are proxied through `/api/predict/fast` and `/api/predict/deep` so the browser never talks to the model hosts directly.
