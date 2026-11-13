# PhishGuard

> **Stop before you click.**

PhishGuard is an explainable phishing-email detection platform. It helps people
make a safer decision before opening a link, downloading an attachment, or
sharing sensitive information.

## Project overview

Phishing messages are designed to look familiar and create urgency. A simple
"safe" or "unsafe" label is not always enough, especially when a message
imitates a bank, employer, delivery service, or school.

PhishGuard lets a user paste suspicious email text and receive a clear risk
verdict with the signals that influenced it. The web application connects to
two NLP prediction services:

- **Fast Check** uses a classical machine-learning model for quick, everyday
  screening.
- **Deep Check** uses a transformer-based model for more difficult or
  ambiguous messages.
- **Both** lets users compare the two results instead of relying on one opaque
  prediction.

The project also includes a research and training pipeline in
[`notebooks/`](./notebooks/), covering data preparation, model comparison,
hyperparameter tuning, and explainability.

## Key features

These features are designed around the problems people actually face when
evaluating suspicious messages:

- **A decision, not just a label:**
  Results are presented as **Safe**, **Suspicious**, or **Dangerous**, helping
  users decide whether to pause, verify, or avoid the message.

- **Evidence behind the prediction:**
  Important signals such as urgency, password requests, and unusual links are
  highlighted so users can understand *why* a message was flagged.

- **Two levels of analysis:**
  Fast Check reduces waiting time for routine checks, while Deep Check provides
  a stronger language analysis when wording is subtle or highly convincing.

- **Comparison for uncertain cases:**
  Running both checks gives users a second signal and exposes cases where the
  models disagree.

- **Privacy-conscious request flow:**
  Prediction requests are proxied through the Next.js server rather than
  exposing model hosts directly in the browser. The application is designed
  to use email text for the current check without storing or sharing it.

- **Actionable explanations for non-technical users:**
  The interface avoids requiring cybersecurity or machine-learning knowledge.
  It explains the result in plain language and reminds users not to share
  passwords or one-time codes by email.

- **Built-in feedback channel:**
  Contact and review forms allow users to report problems or describe whether
  a result was useful. Messages are delivered through Resend.

## Tech stack

### Web application

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- `next-themes` for light and dark themes
- Zod for request validation
- Resend for contact and review email delivery

### Machine-learning pipeline

- Classical NLP features including TF-IDF and n-grams
- Classical models including Naive Bayes, Logistic Regression, SVM,
  Random Forest, and XGBoost
- Deep-learning models including BiLSTM and TextCNN
- DistilBERT fine-tuning
- LIME and SHAP/attention-based explainability experiments

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Product introduction, threat education, reviews, and FAQs |
| `/check` | Fast, Deep, or combined email analysis |
| `/how-it-works` | Plain-language explanation of the analysis flow |
| `/contact` | Contact and review form |
| `/privacy` | Privacy and non-storage messaging |

The prediction endpoints are exposed by the web app at:

- `POST /api/predict/fast`
- `POST /api/predict/deep`

Both endpoints accept a JSON body containing an email `text` field.

## Installation guide

### Prerequisites

- Node.js 20 or newer
- npm
- Access to the Fast and Deep prediction services
- A Resend account if contact and review emails are required locally

### 1. Clone the repository

```bash
git clone https://github.com/sayedio/fishguard.git
cd fishguard
```

If you are working from the web application directory instead:

```bash
cd phishguard-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file from the example:

```bash
copy .env.example .env.local
```

On macOS or Linux, use:

```bash
cp .env.example .env.local
```

Update `.env.local` with the URLs for both prediction services:

```env
NEXT_PUBLIC_SVM_API_URL=https://your-fast-model.example.com
NEXT_PUBLIC_BERT_API_URL=https://your-deep-model.example.com
```

To enable the contact and review form, also configure:

```env
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_TO_EMAIL=your-inbox@example.com
RESEND_FROM_EMAIL=PhishGuard <onboarding@resend.dev>
```

Never commit `.env.local` or API keys. The repository ignores local
environment files by default.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Validate the application

```bash
npm run lint
npm run build
```

## Training notebooks

The notebooks are intended to be run in order, preferably in Google Colab with
a T4 GPU for the deep-learning stages. See
[`notebooks/README.md`](./notebooks/README.md) for the complete sequence.

The pipeline covers:

1. Dataset setup and cleaning
2. Exploratory analysis
3. Preprocessing and imbalance handling
4. TF-IDF and n-gram feature engineering
5. Classical model training
6. BiLSTM and TextCNN training
7. DistilBERT fine-tuning
8. Hyperparameter tuning
9. Model comparison and explainability

## Collaboration

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a focused branch:

   ```bash
   git checkout -b feature/your-change
   ```

3. Make the smallest change that solves the problem.
4. Run `npm run lint` and `npm run build`.
5. Open a pull request with:
   - a short summary of the change;
   - screenshots for UI changes;
   - test or validation steps;
   - any required environment or model-service changes.

For model or notebook work, explain the dataset preparation, evaluation
metrics, and how the change affects the Fast or Deep prediction service.

## Contact

Use the in-app contact form at `/contact` for questions, feedback, or result
reports. For project contributions and technical discussions, open a GitHub
issue or pull request in
[`sayedio/fishguard`](https://github.com/sayedio/fishguard).

## Licence

This project is released under the [MIT License](./LICENSE).
