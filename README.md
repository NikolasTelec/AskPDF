# AskPDF

AskPDF is a web application that lets you upload a PDF document and have an interactive conversation with it. Ask questions, get summaries, and extract information from your documents using AI. No more scrolling through pages to find what you need.

**🔗 Live demo:** [ask-pdf-neon.vercel.app](https://ask-pdf-neon.vercel.app)

<img width="1919" height="949" alt="project_image" src="https://github.com/user-attachments/assets/c13c0bda-0264-4f49-b2c6-d254ab8246a0" />


## Features

- 📄 **Upload & Chat** - upload any PDF and ask questions directly about its content
- 🔐 **Authentication** - sign in with email or Google (via Supabase Auth)
- 💬 **Persistent chat history** - conversations are saved per document
- 💳 **Subscription plans** - free and Pro tiers with usage limits, powered by Stripe
- 📱 **Responsive design** - works across desktop and mobile

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth & Database:** [Supabase](https://supabase.com/)
- **AI:** Google Gemini API
- **Payments:** [Stripe](https://stripe.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- A [Google Gemini API](https://ai.google.dev/) key
- A [Stripe](https://stripe.com/) account (for subscription features)

### Installation

```bash
git clone https://github.com/NikolasTelec/AskPDF.git
cd AskPDF
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PRO_PRICE_ID=your_stripe_price_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App
NEXT_PUBLIC_SITE_URL=your_production_url
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

The app is deployed on [Vercel](https://vercel.com/), connected directly to this GitHub repository. Every push to `main` automatically triggers a new production build.

## License

This project is for portfolio purposes.
