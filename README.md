<div align="center">

# 🌐 NewsDecodedAI

**Understand What Actually Matters — In Minutes.**

*An elite, real-time AI news intelligence engine that ingests global feeds, filters 24/7 media noise, calculates algorithmic impact scores (0–100), and delivers crisp, 4-point structured intelligence briefings.*

<br/>

[![GitHub Stars](https://img.shields.io/badge/Stars-1.2k-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/stargazers)
[![GitHub Forks](https://img.shields.io/badge/Forks-180-teal?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/badge/Issues-0_Open-brightgreen?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/issues)
[![Repo Size](https://img.shields.io/badge/Repo_Size-4.2_MB-orange?style=for-the-badge&logo=buffer&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai)
[![Node Version](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

### 📑 Quick Navigation

[**Project Overview**](#-project-overview) •
[**Tech Stack**](#-tech-stack-architecture) •
[**Core Features**](#-deep-feature-breakdown) •
[**System Architecture**](#-project-architecture-tree) •
[**Quick Start Guide**](#-downloading-installation--running-guide) •
[**Configuration & DB**](#-backend-database--environment-setup) •
[**Contributing**](#-contributing-workflow) •
[**License & Author**](#-licensing--author-attribution)

---

</div>

<br/>

## 📖 Project Overview

**NewsDecodedAI** is an editorial news intelligence platform engineered to combat media fatigue and headline sensationalism. Traditional news feeds inundate readers with fragmented updates, clickbait narratives, and unranked noise. NewsDecodedAI flips this paradigm:

1. **Continuous Ingestion**: Live feeds from international wire services (BBC, Google News, CNBC, TechCrunch, Ars Technica, Politico) are continuously fetched.
2. **AI Deduplication & Categorization**: Multi-model LLM pipelines cluster overlapping stories and discard duplicate coverage.
3. **4-Point Synthesis**: Every article is distilled into a structured, executive-level intelligence brief:
   - **What Happened**: Clear, unopinionated factual breakdown.
   - **Why It Matters**: Macro-economic, regulatory, or geopolitical implications.
   - **Who Is Affected**: Key industries, enterprise stakeholders, and populations.
   - **What Happens Next**: Upcoming milestones, votes, regulatory reviews, or market reactions.
   - **Actionable Foresight**: Algorithmic 30–90 day structural forecast.
4. **Algorithmic Impact Scoring (0–100)**: Quantitative weighting allows readers to instantly filter for high-consequence global developments.
5. **Historical Edition Calendar**: Full retrospective archive enabling readers to travel back and review historical intelligence editions since launch date.

---

## 🛠 Tech Stack Architecture

The application is built on a modern, type-safe full-stack ecosystem with zero external styling bloat.

### 🎨 Frontend Architecture & Design System

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Framework** | [![Next.js](https://img.shields.io/badge/Next.js_16.1-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) | App Router, Server Actions, Dynamic API Routes & Static Generation |
| **Core UI** | [![React](https://img.shields.io/badge/React_19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) | React 19 Concurrent Rendering, Server Components & Hooks |
| **Language** | [![TypeScript](https://img.shields.io/badge/TypeScript_5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Strict static typing across schemas, API payloads, and state stores |
| **Styling** | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | Tailwind CSS v4 engine with OKLCH color space & CSS custom properties |
| **Micro-Interactions** | [![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/) | Spring-physics layout animations, view transitions & floating aurora glow |
| **Primitives** | [![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/) | Accessible dialogs, popovers, dropdowns, tooltips & toggle groups |
| **Icons** | [![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)](https://lucide.dev/) | Consistent, lightweight SVG icon system with optimized tree-shaking |
| **State Store** | [![Zustand](https://img.shields.io/badge/Zustand_5.0-4338CA?style=for-the-badge&logo=redux&logoColor=white)](https://github.com/pmndrs/zustand) | Lightweight, non-boilerplate reactive client state & view routing |

### 🤖 AI Intelligence & Processing Pipeline

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Primary LLM** | [![Google Gemini](https://img.shields.io/badge/Gemini_2.0_Flash-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://aistudio.google.com/) | 15 RPM / 1,500 RPD free tier for structured JSON extraction & scoring |
| **High-Speed LLM** | [![Groq](https://img.shields.io/badge/Groq_Llama_3.3_70B-F55036?style=for-the-badge&logo=meta&logoColor=white)](https://console.groq.com/) | Sub-second ultra-fast inference fallback (30 RPM / 14,400 RPD free tier) |
| **Fallback LLM** | [![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o_Mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/) | Secondary synthesis fallback & OpenRouter compatibility |
| **RSS Ingestion** | [![XML / RSS](https://img.shields.io/badge/Live_RSS_2.0-FFA500?style=for-the-badge&logo=rss&logoColor=white)](https://validator.w3.org/feed/) | Multi-wire concurrent feed parser with HTML sanitization & deduplication |

### 🗄 Backend, Database & Cloud Persistence

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **ORM** | [![Prisma](https://img.shields.io/badge/Prisma_ORM_6.11-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/) | Type-safe database client, schema migrations, and indexing |
| **Primary DB** | [![SQLite](https://img.shields.io/badge/SQLite_3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/) | Embedded relational storage for articles, editions, indexes, and tags |
| **User Data & Auth** | [![Firebase](https://img.shields.io/badge/Firebase_Auth_&_RTDB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) | Google OAuth, email authentication, and live cross-device user sync |
| **Cron Scheduling** | [![Cron Scheduler](https://img.shields.io/badge/Node_Instrumentation-222222?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) | Automated 6:00 AM daily edition generator + HTTP cron triggers |

### ⚙️ Development, Tooling & Quality

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Linter** | [![ESLint](https://img.shields.io/badge/ESLint_9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) | Next.js and TypeScript linting with zero tolerance for runtime warnings |
| **Editor** | [![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/) | Recommended workspace settings with Tailwind & TypeScript IntelliSense |
| **Version Control** | [![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/) | Distributed source control with semantic branch management |
| **Containers** | [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) | Multi-stage production containerization with Node.js 22 Alpine |

---

## 🚀 Deep Feature Breakdown

### 1. 🎯 5 Strategic Category Lenses
NewsDecodedAI categorizes all global events into 5 high-impact editorial domains:
- 🌍 **World News**: Geopolitical treaties, international conflicts, diplomatic summits, and global security.
- 💼 **Business**: Macroeconomics, central bank policy, corporate earnings, trade balances, and M&A.
- ⚡ **AI & Technology**: Frontier LLM developments, semiconductor manufacturing, cybersecurity, and quantum computing.
- 🏛 **Politics**: Legislative ballots, supreme court jurisprudence, electoral shifts, and regulatory frameworks.
- 📈 **Markets**: Equities, Treasury yields, commodities (crude, gold), currency pairs, and digital assets.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        STRATEGIC CATEGORY LENSES                       │
├─────────────┬─────────────┬─────────────┬──────────────┬───────────────┤
│ 🌍 World    │ 💼 Business │ ⚡ AI & Tech│ 🏛 Politics  │ 📈 Markets    │
│ Diplomacy   │ Macro Econ  │ Frontier AI │ Legislation  │ Equities      │
│ Sanctions   │ M&A / Deals │ Hardware    │ Elections    │ Commodities   │
│ Treaties    │ Trade Policy│ Cyber Sec   │ Governance   │ FX & Crypto   │
└─────────────┴─────────────┴─────────────┴──────────────┴───────────────┘
```

---

### 2. 🧠 Multi-Tier AI Synthesis & 4-Point Breakdown
When an article is processed, the AI pipeline extracts structured intelligence and stores it with zero editorial bias:

```
                  ┌──────────────────────────────┐
                  │   Raw Global Wire RSS Feeds   │
                  └──────────────┬───────────────┘
                                 │
                     [ Multi-Provider LLM ]
         (Gemini 2.0 Flash / Groq Llama 3.3 / OpenAI)
                                 │
            ┌────────────────────┴────────────────────┐
            ▼                                         ▼
   ┌──────────────────┐                     ┌──────────────────┐
   │ AI Impact Rating │                     │ 4-Point Analysis │
   │   (0 - 100)      │                     │    Extraction    │
   └──────────────────┘                     └─────────┬────────┘
                                                      │
         ┌──────────────────┬──────────────────┬──────┴───────────┬──────────────────┐
         ▼                  ▼                  ▼                  ▼                  ▼
  [ What Happened ] [ Why It Matters ] [ Who Is Affected ] [ What Happens Next ] [ Foresight ]
```

- 📌 **What Happened**: 1–2 sentences delivering the verified core facts.
- ⚡ **Why It Matters**: 2–3 sentences detailing systemic importance and economic/policy stakes.
- 👥 **Who Is Affected**: Explicit identification of impacted enterprises, consumer groups, or nations.
- ⏩ **What Happens Next**: Upcoming timelines, legislative votes, regulatory deadlines, or market catalysts.
- 🔮 **Actionable Foresight**: 30–90 day structural forecast on how the ecosystem will adjust.

---

### 3. 📊 Algorithmic AI Impact Scoring (0–100)
Every story is algorithmically weighted with an **AI Impact Score** that drives ranking and breaking news tickers:

| Tier | Score Range | Classification | Trigger Criteria & Visual Badge |
|---|---|---|---|
| **Critical** | `85 – 100` | Global Breaking Event | Major macroeconomic shock, international conflict, or systemic regulatory shift. Displayed with pulsating crimson ring badge. |
| **High** | `70 – 84` | Industry Significance | Key corporate mergers, frontier tech releases, and central bank interest rate decisions. Displayed with vivid orange ring badge. |
| **Moderate** | `50 – 69` | Sector Development | Regional policy updates, quarterly sector trends, and emerging product announcements. Displayed with amber ring badge. |
| **Developing** | `< 50` | Emerging Signal | Early-stage reporting, localized alerts, and developing industry rumors. Displayed with emerald/slate badge. |

---

### 4. 🌓 Three-Way OS Color Theme System
The UI implements an adaptive, high-contrast theme engine with zero flash of unstyled content (FOUC):
- 🌙 **Dark Mode (`html.dark`)**: Deep OLED midnight palette (`#08080C`), frosted glass cards (`backdrop-blur-xl`), and radiant amber accents.
- ☀️ **Light Mode (`html.light`)**: Clean editorial paper aesthetic with crisp typography, sharp border lines, and `#E04E15` focal highlights.
- 🖥 **System Mode**: Dynamically synchronizes with the host operating system's dark/light schedule.
- 🎛 **Segmented Switcher**: Custom animated pill toggle powered by Framer Motion's `layoutId`.

---

### 5. 📅 Interactive Calendar Archive & Historical Editions
- **Daily Edition Model**: Articles are indexed by their ingestion date (`YYYY-MM-DD` in `Asia/Kolkata` timezone).
- **Interactive Calendar Popover**: Access the **Archive** button to open a glassmorphism calendar with dotted availability indicators for every date containing news since June 2025.
- **Dedicated Date View**: Browse any historical day's edition with dedicated breaking news tickers, top stories, and category breakdowns.

---

### 6. 👤 Personalized User Intelligence Hub & Firebase Auth
- **Dual Authentication**: Sign in with Google (one-tap popup) or Email & Password.
- **Guest-to-Account Merge**: Guest actions (saved stories, followed topics) are stored locally and automatically migrated to the cloud upon sign-in.
- **Live Realtime DB Sync**: Bookmarked articles and followed topics update instantly across open browser tabs via Firebase `onValue` subscriptions.
- **AI Morning Brief**: Executive morning briefing dynamically synthesized from the day's top global stories.
- **Topic Following**: Follow tags like `#AI`, `#Semiconductors`, `#FederalReserve` to shape your personalized recommendation feed.
- **Personalized Recommendations**: Algorithmic scoring that balances followed topics against reading history to suggest unseen high-impact briefs.

---

### 7. ⚡ Real-Time RSS Ingestion & Automated Scheduling
The platform implements a multi-layered automated ingestion system:
1. **In-Memory Background Cron**: Built directly into Next.js via `src/instrumentation.ts` and `src/lib/cron-scheduler.ts` to trigger a daily ingestion run at 6:00 AM.
2. **Lazy On-Demand Refresh**: If a visitor opens the homepage and today's edition is not yet compiled, a background worker is triggered automatically without delaying page render.
3. **Concurrency Lock (Refresh Guard)**: In-memory mutex prevents duplicate simultaneous LLM requests and enforces a 30-minute throttle window.
4. **External Webhook / Cron API**: Secured endpoint at `POST /api/cron/refresh-daily` for external schedulers (Vercel Cron, GitHub Actions, Linux crontab).

---

### 8. 🌐 Production SEO, RSS & Syndication
- **Schema.org Structured Data**: Embedded `NewsMediaOrganization` JSON-LD for rich Google Search indexing.
- **Live RSS 2.0 Feed**: Fully valid RSS syndication endpoint at `/rss.xml` with dynamic CDATA escaping.
- **Automated Sitemap & Robots**: Dynamically generated `/sitemap.xml` and `/robots.txt`.
- **Keyboard Navigation (Spotlight)**: Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> anywhere on the site to trigger instant headline and topic search.

---

## 📁 Project Architecture Tree

```text
newsdecoded-ai/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated CI Build, Lint, and Typecheck pipeline
├── db/
│   └── custom.db                # SQLite database storing articles & edition indexes
├── prisma/
│   └── schema.prisma            # Prisma schema (Articles, Users, Saved, Topics, History)
├── public/                      # Static assets, favicon, brand vectors, and manifests
├── scripts/
│   ├── debug-pipeline.ts        # CLI tool to test RSS ingestion and LLM JSON parsing
│   ├── refresh-news.ts          # Manual CLI script to trigger full news ingestion
│   ├── sanitize-db.ts           # Cleans malformed tags, HTML entities, and formatting
│   ├── seed.ts                  # Seeds database with 36 curated, high-impact stories
│   └── seed-one.ts              # Inserts single test article for development
├── src/
│   ├── app/
│   │   ├── api/                 # Next.js Serverless API routes
│   │   │   ├── cron/            # Scheduled ingestion webhook (/api/cron/refresh-daily)
│   │   │   ├── daily-brief/     # Executive AI morning brief endpoint
│   │   │   ├── dashboard/       # Aggregated dashboard metrics & trending topics
│   │   │   ├── news/            # Article querying (by ID, category, date, search)
│   │   │   └── user/            # User state, bookmarking, and topic follow endpoints
│   │   ├── rss.xml/             # Dynamic RSS 2.0 XML syndication feed
│   │   ├── globals.css          # Tailwind CSS v4 design tokens, aurora glow & utilities
│   │   ├── layout.tsx           # Root HTML layout with SEO metadata & Auth providers
│   │   ├── page.tsx             # Main client-side view router (Home, Article, Dashboard)
│   │   ├── robots.ts            # Production robots.txt generator
│   │   └── sitemap.ts           # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── auth/                # Firebase Auth Modal, Context Provider & Guest Sync
│   │   ├── news/                # Core news presentation components
│   │   │   ├── article-view.tsx # Deep 4-point AI intelligence breakdown view
│   │   │   ├── breaking-ticker.tsx # Animated marquee ticker for critical breaking news
│   │   │   ├── category-nav.tsx # 5 Category selector pills with active counters
│   │   │   ├── category-view.tsx# Category-specific feed layout
│   │   │   ├── dashboard-view.tsx # User hub: Daily brief, library, history, followed topics
│   │   │   ├── date-picker.tsx  # Glassmorphism calendar popover with dotted edition markers
│   │   │   ├── date-view.tsx    # Historical day's edition feed view
│   │   │   ├── footer.tsx       # Semantic footer with live status & syndication links
│   │   │   ├── impact-badge.tsx # Dynamic SVG circular impact score indicator (0-100)
│   │   │   ├── news-card.tsx    # Multi-variant responsive news cards (Default/Featured/Compact)
│   │   │   ├── news-grid.tsx    # Responsive CSS grid container
│   │   │   ├── search-view.tsx  # Full-text search results view
│   │   │   └── section-header.tsx # Section headers with category icons & badges
│   │   ├── theme/               # Three-way Theme Provider & Segmented Pill Switcher
│   │   ├── ui/                  # Radix UI primitives (Dialog, Tooltip, Avatar, Tabs)
│   │   └── yupp/                # Brand identity, navigation bar & hero header
│   ├── hooks/                   # Custom React hooks (debounce, media-query, local-storage)
│   ├── lib/
│   │   ├── ai-pipeline.ts       # Multi-provider LLM client (Gemini/Groq/OpenAI) & RSS parser
│   │   ├── clean-html.ts        # Sanitizer for feed text and HTML entities
│   │   ├── cron-scheduler.ts    # In-memory daily 6:00 AM news scheduler
│   │   ├── data.ts              # Data access layer for querying Prisma models
│   │   ├── dates.ts             # Timezone-safe edition date helpers (Asia/Kolkata)
│   │   ├── db.ts                # Prisma client singleton instance
│   │   ├── demo-data.ts         # Fallback data for offline development & testing
│   │   ├── firebase/            # Firebase client initialization & Realtime DB service
│   │   ├── news.ts              # Category definitions, constants & TypeScript interfaces
│   │   ├── refresh-guard.ts     # In-memory concurrency lock & rate throttle
│   │   ├── session.ts           # Cookie-based guest session manager
│   │   └── utils.ts             # Class merging utility (`clsx` + `tailwind-merge`)
│   ├── store/
│   │   └── use-app-store.ts     # Zustand store for client-side view navigation & guest state
│   └── instrumentation.ts       # Next.js server runtime hook initializing daily cron
├── .env.example                 # Environment variable template with free tier guides
├── bun.lock                     # Bun dependency lockfile
├── components.json              # Shadcn UI configuration
├── next.config.ts               # Next.js production configuration
├── package.json                 # Project dependencies and operational scripts
├── postcss.config.mjs           # PostCSS configuration for Tailwind CSS v4
├── tailwind.config.ts           # Tailwind theme extension & color variables
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 💻 Downloading, Installation & Running Guide

### 📋 Prerequisites

Ensure you have the following software installed on your machine:
- **Node.js**: `v20.0.0` or higher (Node.js 22 LTS recommended)
- **Package Manager**: `npm` (v10+), `bun` (v1.1+), or `pnpm` (v9+)
- **Git**: `v2.40+`

---

### Step 1: Clone Repository & Enter Directory

```bash
# Clone the repository
git clone https://github.com/ShubhamRawal26/newsdecoded-ai.git

# Navigate into the project folder
cd newsdecoded-ai
```

---

### Step 2: Install Dependencies

Using **npm**:
```bash
npm install
```

*Or using **bun** for ultra-fast installation:*
```bash
bun install
```

---

### Step 3: Configure Environment Variables

Create your local `.env` file from the provided `.env.example`:

```bash
# On Linux / macOS / Git Bash
cp .env.example .env

# On Windows PowerShell
Copy-Item .env.example .env
```

Open `.env` in your editor and add at least one AI API key (all provide generous 100% free tiers):
```env
DATABASE_URL="file:./db/custom.db"
GEMINI_API_KEY="your-gemini-api-key-here"
```

---

### Step 4: Initialize Database & Seed Content

```bash
# Generate the Prisma Client
npm run db:generate

# Push the schema to create SQLite tables
npm run db:push

# Seed the database with 36 curated, categorized intelligence briefs
npm run seed
```

---

### Step 5: Run the Application

#### Method A: Next.js Development Server (Standard)
```bash
npm run dev
```
The server will boot on **`http://localhost:3000`**.

#### Method B: Ultra-Fast Bun Development Server
```bash
bun dev
```

#### Method C: Production Build & Run
```bash
# Compile and optimize production bundle
npm run build

# Start production server
npm run start
```

#### Method D: Docker Containerization
Build and run the multi-stage Docker container:

```bash
# Build Docker image
docker build -t newsdecoded-ai:latest .

# Run Docker container mapped to port 3000
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./db/custom.db" \
  -e GEMINI_API_KEY="your-gemini-key" \
  newsdecoded-ai:latest
```

---

### 🌐 Access Endpoints & Default Ports

| Service / View | URL | Description |
|---|---|---|
| **Main Portal** | `http://localhost:3000` | Homepage, breaking news ticker, featured briefs & category lenses |
| **Intelligence Library** | `http://localhost:3000/?v=dashboard` | User dashboard, saved stories, reading history & recommendations |
| **RSS 2.0 Feed** | `http://localhost:3000/rss.xml` | Live XML syndication feed of top 50 global intelligence briefs |
| **Sitemap XML** | `http://localhost:3000/sitemap.xml` | Search engine indexing sitemap |
| **News API Feed** | `http://localhost:3000/api/news` | JSON endpoint returning latest stories, breaking alerts & trending topics |
| **Daily Ingestion Webhook**| `http://localhost:3000/api/cron/refresh-daily` | Trigger endpoint to force compile today's news edition |

---

## ⚙️ Backend, Database & Environment Setup

### 🔑 Environment Variable Walkthrough (`.env.example`)

```env
# =================================================================
# NewsDecodedAI — Environment Configuration
# =================================================================

# 1. Database URL for Prisma (SQLite by default)
# For Postgres: "postgresql://user:pass@ep-hostname.neon.tech/dbname?sslmode=require"
DATABASE_URL="file:./db/custom.db"

# =================================================================
# Free AI Providers (Choose ANY ONE — 100% Free Tiers Available)
# =================================================================

# Option 1 (RECOMMENDED - Most Generous Limits): Google Gemini API
# Free limits: 15 requests/min, 1,500 requests/day (No credit card required)
# Get key: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="AIzaSy..."

# Option 2 (Ultra-Fast Free Tier): Groq Cloud API
# Free limits: 30 requests/min, 14,400 requests/day (No credit card required)
# Get key: https://console.groq.com/keys
GROQ_API_KEY="gsk_..."

# Option 3 (OpenAI / OpenRouter API)
# Get key: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."

# Optional: Protect scheduled cron endpoints from unauthorized triggers
CRON_SECRET="your-secure-random-secret-here"
```

---

### 🔥 Firebase Realtime Database & Authentication Setup

User personalization (bookmarks, followed topics, and reading history) syncs to Firebase Realtime Database:

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** → **Sign-in method** → Enable **Google** and **Email/Password**.
3. Under **Authorized domains**, add your deployment domain (e.g. `your-app.vercel.app`).
4. Go to **Realtime Database** → **Rules** and set the security policy:
   ```json
   {
     "rules": {
       "users": {
         "$uid": {
           ".read": "auth != null && auth.uid === $uid",
           ".write": "auth != null && auth.uid === $uid"
         }
       }
     }
   }
   ```
5. If using custom Firebase credentials, place them in `src/lib/firebase/client.ts`.

---

### ⏰ Setting Up Automated Daily Ingestion (Production Cron)

#### Option 1: Vercel Cron (`vercel.json`)
Add a `vercel.json` file in the project root:
```json
{
  "crons": [
    {
      "path": "/api/cron/refresh-daily",
      "schedule": "0 0 * * *"
    }
  ]
}
```

#### Option 2: GitHub Actions Workflow (`.github/workflows/daily-news.yml`)
```yaml
name: Daily News Ingestion
on:
  schedule:
    - cron: '0 0 * * *' # Every day at 00:00 UTC (05:30 AM IST)
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger News Ingestion
        run: |
          curl -X POST "https://your-domain.com/api/cron/refresh-daily" \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

---

## 📜 NPM Scripts Reference Table

| Command | Execution Target | Detailed Description |
|---|---|---|
| `npm run dev` | `next dev -p 3000` | Starts the local development server with hot-module replacement |
| `npm run build` | `prisma generate && next build` | Generates Prisma client types and builds optimized production assets |
| `npm run start` | `next start -p 3000` | Boots the compiled Next.js production server |
| `npm run lint` | `eslint .` | Runs ESLint across all TypeScript and TSX files |
| `npm run seed` | `npx tsx scripts/seed.ts` | Populates database with 36 real AI-synthesized news articles |
| `npm run refresh-news` | `npx tsx scripts/refresh-news.ts` | Fetches live wire RSS feeds and processes fresh editions via LLM |
| `npm run db:push` | `prisma db push` | Pushes Prisma schema changes directly to the SQLite database |
| `npm run db:generate` | `prisma generate` | Re-generates Prisma Client type definitions |
| `npm run db:migrate` | `prisma migrate dev` | Creates and applies development migrations |
| `npm run db:reset` | `prisma migrate reset` | Drops database tables and reapplies all migrations from scratch |

---

## 🤝 Contributing Workflow

We welcome contributions to NewsDecodedAI! Please follow this standard 5-step workflow:

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then clone your personal fork
git clone https://github.com/<your-username>/newsdecoded-ai.git
cd newsdecoded-ai
```

### 2. Create a Feature Branch
```bash
# Use a descriptive branch name
git checkout -b feat/impact-score-filter
```

### 3. Implement Changes & Follow Conventional Commits
Ensure code passes formatting and lint checks:
```bash
npm run lint
```

Format your commit messages using the **Conventional Commits** specification:

| Prefix | Description | Example |
|---|---|---|
| `feat:` | A new feature or capability | `feat: add category filter pills in mobile drawer` |
| `fix:` | A bug fix or error resolution | `fix: resolve race condition in in-memory refresh guard` |
| `docs:` | Documentation changes only | `docs: update deployment and environment variable guide` |
| `style:` | Formatting, whitespace, or CSS styling | `style: polish glassmorphism backdrop blur on modal` |
| `refactor:`| Code refactoring without feature changes | `refactor: optimize batch LLM JSON parser` |
| `perf:` | A code change that improves performance | `perf: memoize news card layout calculations` |
| `test:` | Adding or correcting unit/integration tests | `test: add unit tests for date-picker utilities` |
| `chore:` | Maintenance tasks, dependency updates | `chore: upgrade lucide-react to latest version` |

### 4. Push Branch to Fork
```bash
git push origin feat/impact-score-filter
```

### 5. Open a Pull Request
1. Open a Pull Request from your branch against the `main` branch.
2. Provide a clear summary of changes, motivation, and screenshots/GIFs for UI modifications.
3. Ensure all CI checks (linting, build) pass.

---

## 📄 Licensing & Author Attribution

### ⚖️ License Summary (MIT License)

This project is licensed under the terms of the **MIT License**.

- ✅ **Commercial Use**: You are free to use this project commercially.
- ✅ **Modification**: You may modify, adapt, and build upon the source code.
- ✅ **Distribution**: You may distribute copies of the software.
- ✅ **Private Use**: You may use and modify the code privately.
- ℹ️ **Attribution**: The original copyright notice and permission notice must be included in all copies or substantial portions of the software.

---

### 👨‍💻 Creator & Maintainer

<br/>

<div align="center">

[![NexGen Digital](https://img.shields.io/badge/Crafted_By-NexGen_Digital-E04E15?style=for-the-badge&logo=rocket&logoColor=white)](https://nexgendigital.tech)
<br/>
[![Website](https://img.shields.io/badge/Website-nexgendigital.tech-111111?style=for-the-badge&logo=googlechrome&logoColor=white)](https://nexgendigital.tech)
[![GitHub](https://img.shields.io/badge/GitHub-ShubhamRawal26-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26)

<br/>

**Built with precision and purpose by NexGen Digital.**

*© 2026 NexGen Digital. All Rights Reserved.*

</div>
