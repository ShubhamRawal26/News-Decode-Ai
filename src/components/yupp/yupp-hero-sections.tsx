"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, ShieldCheck, Activity,
  Zap, Globe2, TrendingUp, Check, Bookmark, Calendar, ArrowUpRight
} from "lucide-react";
import { RotatingStampBadge } from "./yupp-logo";
import { useAppStore } from "@/store/use-app-store";
import type { NewsArticle } from "@/lib/news";
import { cn } from "@/lib/utils";

interface YuppHeroSectionsProps {
  featuredStory?: NewsArticle;
  onAuthOpen: () => void;
  onExplore: () => void;
}

export function YuppHeroSections({ featuredStory, onAuthOpen, onExplore }: YuppHeroSectionsProps) {
  const go = useAppStore((s) => s.go);

  const sampleStory = featuredStory || {
    id: "sample-1",
    title: "Global Semiconductor Treaty Reaches Historic Agreement on Supply Security",
    summary: "A landmark multi-nation agreement establishes unified manufacturing protocols and secures $420B in clean tech capital.",
    whatHappened: "Delegates from 28 nations signed a binding framework securing semiconductor supply chains and wafer access.",
    whyItMatters: "Prevents supply fragmentation, stabilizes global tech hardware pricing, and guarantees 2nm chip allocations.",
    whoIsAffected: "Enterprise hardware manufacturers, automotive OEMs, and global technology consumers.",
    whatHappensNext: "Implementation phase begins across four continental fabrication hubs by Q3.",
    impactScore: 94,
    category: "ai-tech",
    subcategory: "Semiconductors",
    sourceName: "Global Tech Wire",
    publishedAt: new Date().toISOString(),
    tags: ["Semiconductors", "Supply Chain", "Global Policy"],
    readTime: 3,
    isBreaking: true,
    isFeatured: true,
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* =========================================================================
          1. TOP HERO CARD (Deep Chocolate Espresso Background #2E151B)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-dark p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Warm Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#E04E15]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FBE2D5] text-xs font-semibold backdrop-blur-md">
                <Sparkles size={13} className="text-[#E04E15]" />
                <span>AI-Powered News Scoring & Synthesis</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
                Understand what <br />
                <span className="text-[#FBE2D5] italic font-medium">actually matters.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#D4BEC3] leading-relaxed max-w-md">
                AI analyzes thousands of verified news sources in real time to score every event from 0–100, extract key facts, and decode why it matters and what happens next.
              </p>

              {/* Signature Google Sign In & Explore Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onAuthOpen}
                  className="btn-yupp-primary text-sm py-3 px-6 shadow-xl shadow-orange-950/40"
                >
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center -ml-1 mr-1">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                  <span>Sign in with Google</span>
                  <div className="h-6 w-6 rounded-full bg-black/20 flex items-center justify-center -mr-1 ml-1">
                    <ArrowRight size={13} />
                  </div>
                </button>

                <button
                  onClick={onExplore}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
                >
                  Explore Today&apos;s Feed
                </button>
              </div>
            </div>

            {/* Right Column: Floating Phone Mockup Widget with Real Decoded News Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-[2.5rem] bg-[#FBE2D5] dark:bg-[#2A171D] p-3 sm:p-5 shadow-2xl text-[#2E151B] dark:text-[#FFF1E8] border-4 border-white/20 dark:border-white/10">
                {/* Phone Notch & Header */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-black/10 dark:border-white/10 text-xs">
                  <span className="font-mono text-[10px] font-bold">9:41</span>
                  <div className="h-4 w-16 rounded-full bg-black/10 dark:bg-white/10" />
                  <span className="text-[10px] font-bold text-[#E04E15]">LIVE INTELLIGENCE</span>
                </div>

                {/* Inner Phone Content: Decoded Story Snapshot */}
                <div className="mt-3 p-4 rounded-3xl bg-white/95 dark:bg-[#1A0D12]/95 backdrop-blur-md shadow-sm space-y-3 border border-border/40">
                  {/* Top Impact Score Pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E04E15] bg-[#E04E15]/10 px-2 py-0.5 rounded-full">
                      AI Impact Score
                    </span>
                    <span className="font-mono font-extrabold text-sm text-[#E04E15] bg-[#E04E15]/10 px-2.5 py-0.5 rounded-full">
                      {sampleStory.impactScore} / 100
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-heading font-extrabold text-xs sm:text-sm text-foreground leading-snug">
                    {sampleStory.title}
                  </h3>

                  {/* 3-Point Structured Intelligence Breakdown */}
                  <div className="space-y-2 text-[11px] leading-relaxed">
                    <div className="p-2.5 rounded-2xl bg-[#FEEFE6] dark:bg-[#28141B] border border-black/5 dark:border-white/10">
                      <span className="font-bold text-[#E04E15] block text-[10px] uppercase tracking-wider mb-0.5">
                        • What Happened
                      </span>
                      <p className="text-[#73565C] dark:text-[#D4BEC3] line-clamp-2">{sampleStory.whatHappened}</p>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#FEEFE6] dark:bg-[#28141B] border border-black/5 dark:border-white/10">
                      <span className="font-bold text-[#E04E15] block text-[10px] uppercase tracking-wider mb-0.5">
                        • Why It Matters
                      </span>
                      <p className="text-[#73565C] dark:text-[#D4BEC3] line-clamp-2">{sampleStory.whyItMatters}</p>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#FEEFE6] dark:bg-[#28141B] border border-black/5 dark:border-white/10">
                      <span className="font-bold text-[#E04E15] block text-[10px] uppercase tracking-wider mb-0.5">
                        • What Happens Next
                      </span>
                      <p className="text-[#73565C] dark:text-[#D4BEC3] line-clamp-2">{sampleStory.whatHappensNext}</p>
                    </div>
                  </div>

                  {/* Bottom Action Pill */}
                  <button
                    onClick={() => go({ name: "article", id: sampleStory.id })}
                    className="w-full py-2 rounded-2xl bg-[#E04E15] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <span>Read Full Decoded Brief</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. "WHAT'S NEW" SECTION (Warm Peach Container with Rotating Stamp)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 relative overflow-hidden shadow-md border border-border/40">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] dark:text-[#FFF1E8] tracking-tight">
                What&apos;s New in NewsDecoded
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] dark:text-[#D4BEC3] mt-1 font-medium">
                Our autonomous engine extracts key facts, scores real-world impact, and delivers actionable foresight.
              </p>
            </div>

            {/* Rotating Stamp Badge */}
            <RotatingStampBadge text="DECODE • DECODE • DECODE • " size={80} className="text-[#2E151B] dark:text-[#FFF1E8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: AI Impact Scoring */}
            <div className="rounded-3xl bg-[#1C151B] dark:bg-[#150A0E] p-6 text-white flex flex-col justify-between min-h-[220px] shadow-lg relative overflow-hidden border border-white/10">
              <div className="space-y-2 relative z-10">
                <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#F05A28]">
                  <Activity size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">Objective Impact Scores (0–100)</h3>
                <p className="text-xs text-[#D4BEC3] leading-relaxed">
                  Every story is scored on economic magnitude, geopolitical disruption, market risk, and societal impact.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#FBE2D5] hover:text-white pt-2 border-t border-white/10"
              >
                <span>View High Impact Stories</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Card 2: 4-Point Structural Breakdown */}
            <div className="rounded-3xl bg-card text-card-foreground p-6 flex flex-col justify-between min-h-[220px] shadow-sm border border-border/80">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-[#E04E15] flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">4-Point Intelligence Synthesis</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Clear, digestible sections for What Happened, Why It Matters, Who Is Affected, and What Happens Next.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E04E15] hover:opacity-80 pt-2 border-t border-border/60"
              >
                <span>Explore Synthesis</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Card 3: 2,400+ Verified Sources */}
            <div className="rounded-3xl bg-card text-card-foreground p-6 flex flex-col justify-between min-h-[220px] shadow-sm border border-border/80">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Globe2 size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">Multi-Source Verification</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Eliminates bias and sensationalism by cross-referencing thousands of verified global reporting outlets.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E04E15] hover:opacity-80 pt-2 border-t border-border/60"
              >
                <span>Check Sources</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. "HOW NEWSDECODED WORKS" SECTION
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 shadow-md space-y-8 border border-border/40">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] dark:text-[#FFF1E8] tracking-tight">
                How NewsDecoded Works
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] dark:text-[#D4BEC3] mt-1 font-medium max-w-xl">
                We distill complex global breaking events into structured, objective intelligence briefs in seconds.
              </p>
            </div>

            {/* Rotating LEARN Stamp Badge */}
            <RotatingStampBadge text="LEARN • LEARN • LEARN • " size={80} className="text-[#2E151B] dark:text-[#FFF1E8]" />
          </div>

          {/* Banner: Zero Fluff, 100% Signal */}
          <div className="rounded-[2.5rem] bg-[#2E151B] dark:bg-[#1A0C11] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="space-y-2 max-w-md">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Zero Fluff. 100% Signal.
              </h3>
              <p className="text-xs sm:text-sm text-[#D4BEC3]">
                AI continuously monitors breaking feeds, aggregates key data points, and computes impact relevance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 max-w-md justify-center lg:justify-end">
              {["World News", "Business", "AI & Technology", "Politics", "Markets"].map((lens) => (
                <span
                  key={lens}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/10"
                >
                  {lens}
                </span>
              ))}
            </div>
          </div>

          {/* 2-Column Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="yupp-card-white p-8 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                We score the impact, you get the clarity
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Skip clickbait and endless scroll. See immediate impact ratings from 0 to 100 to instantly know which stories affect markets, policy, and your industry.
              </p>
            </div>

            <div className="yupp-card-white p-8 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Actionable foresight on what happens next
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every decoded piece maps out the upcoming regulatory milestones, market reactions, and timeline projections for the next 30 to 90 days.
              </p>
            </div>
          </div>

          {/* Bottom Wide Banner */}
          <div className="yupp-card-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Five lenses on the world, decoded daily
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Browse our curated categories or search across thousands of indexed stories with intelligent keyword filtering.
              </p>
            </div>

            <button
              onClick={onExplore}
              className="btn-yupp-primary text-sm whitespace-nowrap"
            >
              <span>Explore All Lenses</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WARM QUOTE / TEAM SECTION
         ========================================================================= */}
      <section className="mx-auto max-w-4xl px-4 text-center py-12">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Built for clarity, powered by intelligence.
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We believe everyone deserves access to unbiased, objective news intelligence without the noise, spin, or sensationalism.
        </p>
        <span className="block mt-4 text-xs font-bold uppercase tracking-widest text-[#E04E15]">
          — The NewsDecoded Team
        </span>
      </section>
    </div>
  );
}
