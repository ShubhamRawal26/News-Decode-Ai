"use client";

import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Bot, Cpu, Zap, Trophy,
  ThumbsUp, MessageSquare, Compass, ShieldCheck, Check, Globe2
} from "lucide-react";
import { RotatingStampBadge } from "./yupp-logo";
import { useAppStore } from "@/store/use-app-store";
import type { NewsArticle } from "@/lib/news";

interface YuppHeroSectionsProps {
  featuredStory?: NewsArticle;
  onAuthOpen: () => void;
  onExplore: () => void;
}

export function YuppHeroSections({ featuredStory, onAuthOpen, onExplore }: YuppHeroSectionsProps) {
  const go = useAppStore((s) => s.go);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. TOP HERO CARD (Deep Chocolate Espresso Background) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-dark p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle warm glow inside */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#E04E15]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FBE2D5] text-xs font-semibold backdrop-blur-md">
                <Sparkles size={13} className="text-[#E04E15]" />
                <span>Every AI model, side-by-side for you</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
                Every AI for <br />
                <span className="text-[#FBE2D5] italic font-medium">everyone.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#D4BEC3] leading-relaxed max-w-md">
                Access over 800+ of the best AIs from OpenAI, Google, Anthropic, and DeepSeek. Synthesize global news, compare reasoning, and cast votes to earn credits.
              </p>

              {/* Signature Google Sign In / Start Pill */}
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
                  Explore Feed
                </button>
              </div>
            </div>

            {/* Right Preview Card Graphic */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md rounded-3xl bg-[#FEEFE6] p-6 shadow-2xl text-[#2E151B]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#E04E15]" />
                    <span>World&apos;s smartest AIs, side-by-side</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E04E15]/10 text-[#E04E15]">
                    800+ Models
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-black/5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#E04E15] mb-1">
                      <span>Claude 3.7 Sonnet</span>
                      <span>Deep Reasoning</span>
                    </div>
                    <p className="text-xs text-[#73565C] leading-snug">
                      Comprehensive geopolitical context with causal foresight on global trade corridors.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-black/5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 mb-1">
                      <span>GPT-4.5 Omni</span>
                      <span>Market Synthesis</span>
                    </div>
                    <p className="text-xs text-[#73565C] leading-snug">
                      Capital reallocation models indicate accelerated enterprise adoption in clean tech.
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] text-[#73565C]">
                  <span>Vote for best response</span>
                  <span className="font-bold text-[#E04E15]">+25 Credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "WHAT'S NEW" CAROUSEL SECTION (Warm Peach Container) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] tracking-tight">
                What&apos;s New
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] mt-1 font-medium">
                Check out the latest intelligence announcements & model updates.
              </p>
            </div>

            {/* Rotating NEW Stamp Badge */}
            <RotatingStampBadge text="NEW • NEW • NEW • " size={80} className="text-[#2E151B]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card A: Sonnet 4.6 (Dark landscape card) */}
            <div className="rounded-3xl bg-[#1C151B] p-6 text-white flex flex-col justify-between min-h-[220px] shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#F05A28]">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">Claude Sonnet 4.6</h3>
                <p className="text-xs text-[#D4BEC3] leading-relaxed">
                  Anthropic&apos;s latest model with enhanced coding, long-context reasoning, and causal speed.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#FBE2D5] hover:text-white pt-2 border-t border-white/10"
              >
                <span>Try Sonnet 4.6</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Card B: Gemini 3.1 Pro (White card) */}
            <div className="rounded-3xl bg-white p-6 text-[#2E151B] flex flex-col justify-between min-h-[220px] shadow-sm border border-black/5">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold">Gemini 3.1 Pro</h3>
                <p className="text-xs text-[#73565C] leading-relaxed">
                  Google&apos;s advanced multimodal model with 2M token context, live web retrieval, and logic.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E04E15] hover:opacity-80 pt-2 border-t border-black/5"
              >
                <span>Try Gemini 3.1 Pro</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Card C: DeepSeek R1 (Ivory card) */}
            <div className="rounded-3xl bg-white p-6 text-[#2E151B] flex flex-col justify-between min-h-[220px] shadow-sm border border-black/5">
              <div className="space-y-2">
                <div className="h-10 w-10 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold">DeepSeek R1</h3>
                <p className="text-xs text-[#73565C] leading-relaxed">
                  Open reasoning model specializing in mathematical rigor and first-principles causal mapping.
                </p>
              </div>

              <button
                onClick={onExplore}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#E04E15] hover:opacity-80 pt-2 border-t border-black/5"
              >
                <span>Try DeepSeek R1</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "HOW YUPP WORKS" SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 shadow-md space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] tracking-tight">
                How Yupp Works
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] mt-1 font-medium max-w-xl">
                Use multiple AIs side-by-side for no cost. Provide feedback to win credits that let you keep prompting.
              </p>
            </div>

            {/* Rotating LEARN Stamp Badge */}
            <RotatingStampBadge text="LEARN • LEARN • LEARN • " size={80} className="text-[#2E151B]" />
          </div>

          {/* Banner inside: Every AI for everyone with Model Badges */}
          <div className="rounded-[2.5rem] bg-[#2E151B] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-md">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Every AI for everyone
              </h3>
              <p className="text-xs sm:text-sm text-[#D4BEC3]">
                Access over 800 of the best AIs from OpenAI, Google, Anthropic, and more available at zero cost.
              </p>
            </div>

            {/* Floating Model Badges Grid */}
            <div className="flex flex-wrap items-center gap-2.5 max-w-md justify-center lg:justify-end">
              {["Anthropic", "OpenAI", "DeepSeek", "Google Gemini", "Mistral", "Meta Llama", "Perplexity", "Grok 3"].map((brand) => (
                <span
                  key={brand}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/10"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* 2-Column Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="yupp-card-white p-8 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2E151B]">
                Multiple AIs, side by side with you
              </h3>
              <p className="text-sm text-[#73565C] leading-relaxed">
                Get side-by-side responses from multiple models for news analysis, coding, and predictions. Compare and see which hits the mark.
              </p>
            </div>

            <div className="yupp-card-white p-8 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2E151B]">
                Give feedback, get more credits
              </h3>
              <p className="text-sm text-[#73565C] leading-relaxed">
                Feedback comes with more credits which allow you to keep using Yupp and access over 800 of the best models available.
              </p>
            </div>
          </div>

          {/* Bottom Wide Banner: Shape the future */}
          <div className="yupp-card-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2E151B]">
                Shape the future, see the stats
              </h3>
              <p className="text-sm text-[#73565C] max-w-xl">
                Curious about how your feedback shapes the industry? Take a look at the Leaderboard to see how models perform across categories.
              </p>
            </div>

            <button
              onClick={() => {
                document.getElementById("yupp-leaderboard")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-yupp-primary text-sm whitespace-nowrap"
            >
              <span>View the leaderboard</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WARM EMOTIONAL QUOTE SECTION */}
      <section className="mx-auto max-w-4xl px-4 text-center py-12">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] dark:text-[#FFF1E8] tracking-tight mb-4">
          Built with love, shaped by a million voices.
        </h2>
        <p className="text-sm sm:text-base text-[#73565C] dark:text-[#BFA8AD] leading-relaxed max-w-2xl mx-auto">
          To every user who asked a question, compared a response, cast a vote, or told a friend: you made Yupp what it was. We are grateful for every prompt, every piece of feedback, and every moment you spent with us.
        </p>
        <span className="block mt-4 text-xs font-bold uppercase tracking-widest text-[#E04E15]">
          — The Yupp Team
        </span>
      </section>
    </div>
  );
}
