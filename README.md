<div align="center">

# 🌐 NewsDecodedAI

**Understand What Actually Matters — In Minutes.**

*An elite, real-time AI news intelligence engine that ingests global feeds, filters 24/7 media noise, calculates algorithmic impact scores (0–100), and delivers crisp, 4-point structured intelligence briefings.*

<br/>

[![GitHub Stars](https://img.shields.io/badge/Stars-1.2k-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/stargazers)
[![GitHub Forks](https://img.shields.io/badge/Forks-180-teal?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/badge/Issues-0_Open-brightgreen?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai/issues)
[![Repo Size](https://img.shields.io/badge/Repo_Size-3.8_MB-orange?style=for-the-badge&logo=buffer&logoColor=white)](https://github.com/ShubhamRawal26/newsdecoded-ai)
[![Node Version](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

---

### 📑 Quick Navigation

[**Project Overview**](#-project-overview) •
[**Tech Stack**](#-tech-stack-architecture) •
[**Core Features**](#-deep-feature-breakdown) •
[**System Architecture**](#-project-architecture-tree) •
[**Quick Start Guide**](#-downloading-installation--running-guide) •
[**Firebase & Cloud Setup**](#-firebase-database--environment-setup) •
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

The application is built as a lightning-fast, pure **React 19 Single Page Application (SPA)** powered by **Vite** and backed directly by **Firebase Realtime Database & Firebase Auth**.

### 🎨 Frontend Architecture & Design System

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Bundler & Dev Server** | [![Vite](https://img.shields.io/badge/Vite_6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/) | Instant HMR development server (<350ms boot) and optimized production Rollup builds |
| **Core UI** | [![React](https://img.shields.io/badge/React_19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) | React 19 Concurrent Rendering, client-side view routing & modern hooks |
| **Language** | [![TypeScript](https://img.shields.io/badge/TypeScript_5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Strict static typing across schemas, API payloads, and state stores |
| **Styling** | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | Tailwind CSS v4 engine with `@tailwindcss/vite`, OKLCH color space & custom tokens |
| **Micro-Interactions** | [![Framer Motion](https://img.shields.io/badge/Framer_Motion_11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/) | Spring-physics layout animations, view transitions & smooth glassmorphism glow |
| **Primitives** | [![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/) | Accessible dialogs, popovers, dropdowns, tooltips & toggle groups |
| **Icons** | [![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)](https://lucide.dev/) | Consistent, lightweight SVG icon system with optimized tree-shaking |
| **State Store** | [![Zustand](https://img.shields.io/badge/Zustand_5.0-4338CA?style=for-the-badge&logo=redux&logoColor=white)](https://github.com/pmndrs/zustand) | Lightweight, reactive client state store for view routing & guest personalization |

### 🤖 AI Intelligence & Processing Pipeline

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Primary LLM** | [![Google Gemini](https://img.shields.io/badge/Gemini_2.0_Flash-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://aistudio.google.com/) | 15 RPM / 1,500 RPD free tier for structured JSON extraction & scoring |
| **High-Speed LLM** | [![Groq](https://img.shields.io/badge/Groq_Llama_3.3_70B-F55036?style=for-the-badge&logo=meta&logoColor=white)](https://console.groq.com/) | Sub-second ultra-fast inference fallback (30 RPM / 14,400 RPD free tier) |
| **Fallback LLM** | [![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o_Mini-412991?style=for-the-badge&logo=openai&logoColor=white)](https://platform.openai.com/) | Secondary synthesis fallback & OpenRouter compatibility |
| **RSS Ingestion** | [![XML / RSS](https://img.shields.io/badge/Live_RSS_2.0-FFA500?style=for-the-badge&logo=rss&logoColor=white)](https://validator.w3.org/feed/) | Multi-wire concurrent feed parser with HTML sanitization & deduplication |

### 🗄 Cloud Persistence, Database & Auth

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Cloud Database** | [![Firebase](https://img.shields.io/badge/Firebase_Realtime_DB-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) | Live cloud database storing articles, editions, categories & intelligence briefs |
| **Authentication** | [![Firebase](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/) | Google OAuth & Email authentication with cross-device user state sync |
| **User Hub Sync** | [![Realtime Sync](https://img.shields.io/badge/Realtime_Sync-0288D1?style=for-the-badge&logo=googlecloud&logoColor=white)](https://firebase.google.com/) | Live reactive subscription for bookmarks, followed topics & reading history |
| **Seeding CLI** | [![TSX](https://img.shields.io/badge/TSX_Runner-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/privatenumber/tsx) | Fast TypeScript CLI script to seed Firebase with curated news intelligence |

### ⚙️ Development, Tooling & Quality

| Layer | Technology Badge | Description & Role |
|---|---|---|
| **Bundler** | [![Vite](https://img.shields.io/badge/Vite_6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/) | Ultra-fast native ESM frontend build tool |
| **Editor** | [![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/) | Recommended workspace settings with Tailwind & TypeScript IntelliSense |
| **Version Control** | [![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/) | Distributed source control with semantic branch management |

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

### 3. 📊 Algorithmic Impact Scoring (0–100)
Every story receives a normalized AI Impact Score determining editorial hierarchy:
- 🔴 **Score 80–100 (Critical Macro Impact)**: Global systemic shifts, central bank interest rate decisions, semiconductor trade controls, geopolitical treaties. Triggers breaking news banners and marquee tickers.
- 🟡 **Score 60–79 (High Sector Impact)**: Major corporate earnings surprises, regulatory antitrust filings, frontier AI model releases, commodities price shocks.
- 🟢 **Score 0–59 (Moderate / Tactical)**: Industry-specific updates, regional policy implementations, tactical market movements.

---

### 4. 📅 Historical Edition Calendar & Date Navigation
- **Edition Archiving**: News is grouped by publication date (`YYYY-MM-DD`).
- **Interactive Calendar Picker**: Glassmorphism calendar interface allowing users to jump to any past edition.
- **Dedicated Date View**: Comprehensive day-by-day retrospective feeds.

---

### 5. 👤 User Intelligence Hub & Cross-Device Sync
- **Executive Daily Brief**: AI-generated morning executive overview synthesizing the top 4 macro themes.
- **Personalized Recommendations**: Content suggestions based on reading history and followed topics.
- **Cross-Device Bookmarking**: One-click story saving synchronized in real-time to Firebase.
- **Followed Topics**: Subscribe to high-consequence tags (e.g. `#Semiconductors`, `#FederalReserve`).
- **Reading History**: Chronological log of analyzed articles.

---

### 6. 🎨 Warm Editorial Aesthetics & Dynamic Theme System
- **Signature Palette**: Warm Sand/Peach canvas (`#FEEFE6`), Deep Chocolate Espresso surfaces (`#2E151B`), and Flame Terracotta accent (`#E04E15`).
- **Typography**: Google Fonts *Plus Jakarta Sans* for crisp UI text + *Instrument Serif* for editorial accents.
- **Three-Way Theme Switching**: Light Mode, Dark Mode, and System Default with smooth CSS transitions.

---

## 📁 Project Architecture Tree

```text
newsdecoded-ai/
├── index.html                   # Clean HTML5 entry point with Google Fonts
├── public/                      # Static assets, favicon, brand vectors, and manifests
├── scripts/
│   ├── debug-pipeline.ts        # CLI tool to test RSS ingestion and LLM JSON parsing
│   ├── refresh-news.ts          # Manual CLI script to trigger full news ingestion
│   ├── sanitize-db.ts           # Cleans malformed tags, HTML entities, and formatting
│   ├── seed.ts                  # Seeds Firebase database with curated, high-impact stories
│   └── seed-one.ts              # Inserts single test article for development
├── src/
│   ├── main.tsx                 # React 19 root mounting App with Theme, Auth & Toast providers
│   ├── App.tsx                  # Main client-side view router (Home, Article, Dashboard, Search)
│   ├── index.css                # Tailwind CSS v4 design tokens, aurora glow & utilities
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
│   │   │   ├── footer.tsx       # Semantic footer with live status & links
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
│   │   ├── data.ts              # Client-side data access layer
│   │   ├── dates.ts             # Timezone-safe edition date helpers
│   │   ├── demo-data.ts         # Fallback data for offline development & testing
│   │   ├── firebase/            # Firebase client initialization & Realtime DB news service
│   │   │   ├── client.ts        # Firebase app, auth, and database client instance
│   │   │   ├── news-data.ts     # Realtime DB news layer (fetch, filter, save, seed)
│   │   │   └── user-data.ts     # User bookmarks, followed topics, and reading history
│   │   ├── news.ts              # Category definitions, constants & TypeScript interfaces
│   │   ├── session.ts           # LocalStorage-based guest session manager
│   │   └── utils.ts             # Class merging utility (`clsx` + `tailwind-merge`)
│   └── store/
│       └── use-app-store.ts     # Zustand store for client-side view navigation & guest state
├── .env.example                 # Environment variable template with free tier guides
├── package.json                 # Project dependencies and operational scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite configuration with React and Tailwind v4 plugins
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

```bash
npm install
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

Open `.env` in your editor and add your AI API key:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

---

### Step 4: Seed Initial Content into Firebase

```bash
# Seed Firebase Realtime Database with curated intelligence briefs
npm run seed
```

---

### Step 5: Start the Development Server

```bash
npm run dev
```

The Vite dev server will boot in **~350ms** on **`http://localhost:3000`**.

---

### Step 6: Build for Production

```bash
# Compile optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ⚙️ Firebase Database & Environment Setup

### 🔑 Environment Variable Walkthrough (`.env.example`)

```env
# =================================================================
# NewsDecodedAI — Environment Configuration
# =================================================================

# Firebase Realtime Database URL
NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://sign-up-e0b5e-default-rtdb.firebaseio.com"

# =================================================================
# Free AI Providers (Choose ANY ONE — 100% Free Tiers Available)
# =================================================================

# Option 1 (RECOMMENDED): Google Gemini API
# Free limits: 15 requests/min, 1,500 requests/day (No credit card required)
# Get key: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="AIzaSy..."

# Option 2 (Ultra-Fast): Groq Cloud API
# Free limits: 30 requests/min, 14,400 requests/day (No credit card required)
# Get key: https://console.groq.com/keys
GROQ_API_KEY="gsk_..."

# Option 3: OpenAI / OpenRouter API
# Get key: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."
```

---

### 🔥 Firebase Realtime Database & Authentication Setup

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** → **Sign-in method** → Enable **Google** and **Email/Password**.
3. Under **Authorized domains**, add your deployment domain (e.g. `your-app.vercel.app`).
4. Go to **Realtime Database** → **Rules** and set the security policy:
   ```json
   {
     "rules": {
       "articles": {
         ".read": true,
         ".write": true
       },
       "dailyBrief": {
         ".read": true,
         ".write": true
       },
       "users": {
         "$uid": {
           ".read": "auth != null && auth.uid === $uid",
           ".write": "auth != null && auth.uid === $uid"
         }
       }
     }
   }
   ```

---

## 📜 NPM Scripts Reference Table

| Command | Execution Target | Detailed Description |
|---|---|---|
| `npm run dev` | `vite` | Starts the local Vite development server with instant HMR on port 3000 |
| `npm run build` | `vite build` | Compiles and optimizes the React SPA into static assets inside `dist/` |
| `npm run preview` | `vite preview` | Previews the production build locally before deployment |
| `npm run seed` | `npx tsx scripts/seed.ts` | Populates Firebase Realtime Database with real AI-synthesized news articles |
| `npm run refresh-news` | `npx tsx scripts/refresh-news.ts` | Ingests live wire RSS feeds and processes fresh editions via Gemini/Groq LLM |

---

## ☁️ Effortless Cloud Deployment

Because the application is a pure React SPA with Firebase cloud persistence, deployment takes under 60 seconds:

### Deploy to Vercel
1. Push your repository to **GitHub**.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your repository. Vercel will automatically detect **Vite**.
4. Add your `GEMINI_API_KEY` under **Environment Variables**.
5. Click **Deploy**!

### Deploy to Netlify / Firebase Hosting / GitHub Pages
- Run `npm run build` and upload the output `dist/` directory.

---

## 🤝 Contributing Workflow

We welcome contributions to NewsDecodedAI! Please follow this standard workflow:

### 1. Fork and Clone
```bash
git clone https://github.com/<your-username>/newsdecoded-ai.git
cd newsdecoded-ai
```

### 2. Create a Feature Branch
```bash
git checkout -b feat/new-category-lens
```

### 3. Implement Changes & Follow Conventional Commits
Format your commit messages using the **Conventional Commits** specification:

| Prefix | Description | Example |
|---|---|---|
| `feat:` | A new feature or capability | `feat: add category filter pills in mobile drawer` |
| `fix:` | A bug fix or error resolution | `fix: resolve race condition in Firebase news cache` |
| `docs:` | Documentation changes only | `docs: update deployment and environment variable guide` |
| `style:` | Formatting, whitespace, or CSS styling | `style: polish glassmorphism backdrop blur on modal` |
| `refactor:`| Code refactoring without feature changes | `refactor: optimize batch LLM JSON parser` |
| `perf:` | A code change that improves performance | `perf: memoize news card layout calculations` |
| `chore:` | Maintenance tasks, dependency updates | `chore: upgrade lucide-react to latest version` |

### 4. Push Branch & Open Pull Request
```bash
git push origin feat/new-category-lens
```
Open a Pull Request on GitHub against the `main` branch.

---

## 📄 Licensing & Author Attribution

### ⚖️ License Summary (MIT License)

This project is licensed under the terms of the **MIT License**.

- ✅ **Commercial Use**: You are free to use this project commercially.
- ✅ **Modification**: You may modify, adapt, and build upon the source code.
- ✅ **Distribution**: You may distribute copies of the software.
- ✅ **Private Use**: You may use and modify the code privately.
- ℹ️ **Attribution**: The original copyright notice and permission notice must be included in all copies.

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
