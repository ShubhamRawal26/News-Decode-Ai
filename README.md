<div align="center">

# NewsDecodedAI

**Understand What Actually Matters — In Minutes.**

*Premium AI-Powered News Intelligence Platform with Real-Time Synthesis, Multi-Lens Categorization, and Impact Scoring.*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.11-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_%26_RTDB-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

---

</div>

## Overview

**NewsDecodedAI** is an editorial news intelligence platform designed to cut through the 24/7 media noise. AI continuously scans thousands of verified global sources, extracts core developments, and provides instant, structured breakdowns:
- **What Happened**: Clear, factual summary of the event.
- **Why It Matters**: Economic, societal, and geopolitical implications.
- **Who Is Affected**: Key stakeholders, industries, and populations.
- **What Happens Next**: Immediate next steps and forecasted milestones.
- **Future Impact Prediction**: Medium-to-long term algorithmic forecasting.

---

## Key Features

### 1. 5 Strategic Category Lenses
- **World News**: Geopolitics, international treaties, global conflicts, diplomacy.
- **Business**: Mergers, monetary policy, macroeconomic shifts, trade.
- **AI & Technology**: Frontier AI models, semiconductors, quantum computing, cybersecurity.
- **Politics**: Legislation, electoral dynamics, judicial rulings, governance.
- **Markets**: Equities, commodities, crypto, foreign exchange.

### 2. AI Impact Scoring (0–100)
Every story is algorithmically weighted with an **AI Impact Score**:
- **Critical (85–100)**: Global breaking events with widespread economic or geopolitical ramifications.
- **High (70–84)**: Industry-wide shifts and significant policy changes.
- **Moderate (50–69)**: Notable developments in specific sectors or markets.
- **Developing (<50)**: Emerging stories monitored in real time.

### 3. Three-Way Theme System
- **Dark Mode (`html.dark`)**: High-contrast OLED midnight palette with subtle frosted glass.
- **Light Mode (`html.light`)**: Crisp editorial paper aesthetic with `#FF6B00` accents.
- **System Mode**: Dynamically follows your operating system preference.
- **Theme Switcher**: Segmented pill control featuring custom Sun, Monitor, and Moon SVG icons.

### 4. Interactive Archive & Daily Calendar
Browse historical news editions back to launch date using an interactive monthly calendar picker.

### 5. Personalized Dashboard & Firebase Auth
- **Cross-Device Sync**: Sign in with Google or Email/Password via Firebase.
- **Saved Stories Library**: Bookmark key articles for offline reading or research.
- **Topic Following**: Follow `#AI`, `#Semiconductors`, `#Geopolitics` to personalize recommendation feeds.
- **Reading History**: Automatically logs recently viewed intelligence.

### 6. Production SEO & Syndication
- Semantic HTML5 hierarchy and Schema.org structured metadata (`NewsMediaOrganization`).
- Live RSS 2.0 Feed (`/rss.xml`) and dynamic Sitemap (`/sitemap.xml`).

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Actions, API Routes) |
| **UI Library** | React 19, Radix UI Primitives, Lucide React Icons |
| **Styling** | Tailwind CSS v4, Vanilla CSS Custom Properties, OKLCH Color Space |
| **Animations** | Framer Motion, CSS Micro-interactions |
| **State Management** | Zustand (with Firebase Realtime Database Sync) |
| **Database & ORM** | SQLite / PostgreSQL via Prisma ORM |
| **Authentication** | Firebase Authentication (Google Auth + Email/Password) |
| **Typography** | Plus Jakarta Sans & Instrument Serif (Google Fonts) |

---

## Quick Start

### Prerequisites
- **Node.js**: `v20.0.0` or higher (Node 22 recommended)
- **npm** or **pnpm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/newsdecoded-ai.git
cd newsdecoded-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default configuration in `.env`:
```env
DATABASE_URL="file:./db/custom.db"
```

### 4. Initialize Database
Generate the Prisma client:
```bash
npm run db:generate
```

Push schema to local database:
```bash
npm run db:push
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server on port 3000 |
| `npm run build` | Generates Prisma client and compiles production bundle |
| `npm run start` | Runs the compiled Next.js production server |
| `npm run lint` | Runs ESLint across all TypeScript and React files |
| `npm run db:generate` | Generates Prisma Client from `prisma/schema.prisma` |
| `npm run db:push` | Pushes Prisma schema changes directly to SQLite database |

---

## Deployment Guides

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:
   - `DATABASE_URL`: Your hosted database URL (e.g. Supabase, Neon PostgreSQL, Turso, or local SQLite).
4. Click **Deploy**. Vercel will automatically build and deploy the Next.js application.

### Deploy to Docker

Build and run using Docker:
```dockerfile
FROM node:22-alpine AS runner
WORKDIR /app
COPY . .
RUN npm ci
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI Build & Test workflow
├── db/
│   └── custom.db                # SQLite database
├── prisma/
│   └── schema.prisma            # Prisma schema (Articles, Users, Saved, Topics)
├── public/                      # Static assets & logos
├── src/
│   ├── app/                     # Next.js App Router (pages, API routes, RSS, sitemap)
│   ├── components/
│   │   ├── auth/                # Firebase Auth Modal, Provider, UserSync
│   │   ├── news/                # News cards, views, hero, ticker, grid, navigation, footer
│   │   ├── theme/               # Three-way Theme Provider & Segmented Switcher
│   │   └── ui/                  # Accessible Radix UI components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Data layer, Prisma client, dates, Firebase helpers
│   └── store/                   # Zustand app store
├── .env.example                 # Environment template
├── package.json                 # Dependencies & build scripts
└── README.md                    # Project documentation
```

---

## Creator & Attribution

Crafted for simplicity and performance.

**Built by NexGen Digital • [nexgendigital.tech](https://nexgendigital.tech)**

© 2026 NexGen Digital. All Rights Reserved.
