"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Bot, Cpu, Zap, Trophy,
  ThumbsUp, Volume2, Play, Pause, Compass, ShieldCheck,
  Check, Globe2, Radio, Flame, ArrowUpRight
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
  const [phoneVoted, setPhoneVoted] = useState<"left" | "right" | null>("left");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* =========================================================================
          1. HERO CONTAINER (Exact match to Yupp.ai Hero Layout & Phone Mockup)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-dark p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Ambient warm gradient inside */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#E04E15]/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Hero Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FBE2D5] text-xs font-semibold backdrop-blur-md">
                <Sparkles size={13} className="text-[#E04E15]" />
                <span>Multi-Model AI News Intelligence</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
                Understand what <br />
                <span className="text-[#FBE2D5] italic font-medium">actually matters.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#D4BEC3] leading-relaxed max-w-md">
                AI scans thousands of verified global news feeds to decode breaking events in real time — with multi-model consensus, impact scores, and causal foresight.
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
                  Explore Today&apos;s Stories
                </button>
              </div>
            </div>

            {/* Right Column: Floating Phone Mockup Widget (Exact replica of Image 1/2) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-[2.5rem] bg-[#FBE2D5] p-3 sm:p-5 shadow-2xl text-[#2E151B] border-4 border-white/20">
                {/* Phone Notch & Header */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-black/10 text-xs">
                  <span className="font-mono text-[10px] font-bold">9:41</span>
                  <div className="h-4 w-16 rounded-full bg-black/10" />
                  <span className="text-[10px] font-bold text-[#E04E15]">PRO ARENA</span>
                </div>

                {/* Inner Phone Content */}
                <div className="mt-3 p-4 rounded-3xl bg-white/90 backdrop-blur-md shadow-sm space-y-3">
                  <div className="text-center space-y-1">
                    <h3 className="font-extrabold text-xs sm:text-sm text-[#2E151B]">
                      World&apos;s smartest AIs, side-by-side with you
                    </h3>
                    <p className="text-[10px] text-[#73565C]">
                      Get the best decoded answers from 800+ AI models.
                    </p>
                  </div>

                  {/* Simulated Question Prompt Box */}
                  <div className="p-2.5 rounded-2xl bg-[#FEEFE6] border border-black/5 text-[11px] text-[#2E151B] font-medium flex items-center justify-between">
                    <span>What is the real market impact of the AI semiconductor race?</span>
                    <div className="h-5 w-5 rounded-full bg-[#E04E15] text-white flex items-center justify-center shrink-0">
                      <ArrowRight size={11} />
                    </div>
                  </div>

                  {/* Side-by-Side Model Response Cards */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {/* Left Model: Perplexity / Claude */}
                    <div
                      onClick={() => setPhoneVoted("left")}
                      className={cn(
                        "p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between",
                        phoneVoted === "left"
                          ? "bg-white border-[#E04E15] ring-1 ring-[#E04E15]/30 shadow-sm"
                          : "bg-white/60 border-black/5"
                      )}
                    >
                      <div>
                        <div className="font-bold text-[#E04E15] flex items-center gap-1 mb-1">
                          <Bot size={10} />
                          <span>Claude 3.7</span>
                        </div>
                        <p className="text-[#73565C] leading-snug">
                          Supply bottleneck shifts from lithography to advanced packaging & energy grid access.
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-black/5 flex items-center gap-1 font-bold text-[#E04E15]">
                        <ThumbsUp size={10} />
                        <span>{phoneVoted === "left" ? "I prefer this ✓" : "Vote"}</span>
                      </div>
                    </div>

                    {/* Right Model: GPT-4.5 */}
                    <div
                      onClick={() => setPhoneVoted("right")}
                      className={cn(
                        "p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between",
                        phoneVoted === "right"
                          ? "bg-white border-[#E04E15] ring-1 ring-[#E04E15]/30 shadow-sm"
                          : "bg-white/60 border-black/5"
                      )}
                    >
                      <div>
                        <div className="font-bold text-indigo-600 flex items-center gap-1 mb-1">
                          <Cpu size={10} />
                          <span>GPT-4.5</span>
                        </div>
                        <p className="text-[#73565C] leading-snug">
                          CapEx reallocation accelerating toward bespoke hyperscaler ASICs across North America.
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-black/5 flex items-center gap-1 font-bold text-indigo-600">
                        <ThumbsUp size={10} />
                        <span>{phoneVoted === "right" ? "I prefer this ✓" : "Vote"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. "WHAT'S NEW" CAROUSEL (Exact match to Image 3)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 relative overflow-hidden shadow-md">
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] tracking-tight">
                What&apos;s New
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] mt-1 font-medium">
                Check out the latest decoded announcements and frontier model releases.
              </p>
            </div>

            {/* Rotating NEW Stamp Badge */}
            <RotatingStampBadge text="NEW • NEW • NEW • " size={80} className="text-[#2E151B]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card A: Claude Sonnet 4.6 (Dark landscape card) */}
            <div className="rounded-3xl bg-[#1C151B] p-6 text-white flex flex-col justify-between min-h-[220px] shadow-lg relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <div className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#F05A28]">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">Claude Sonnet 4.6</h3>
                <p className="text-xs text-[#D4BEC3] leading-relaxed">
                  Anthropic&apos;s latest model offering deep geopolitical reasoning, coding synthesis, and fast causal predictions.
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
                  Google&apos;s advanced model with 2M token context, live web retrieval, and real-time multi-source fact-checking.
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
                  Open reasoning model mapping first-principles logic, mathematical proofs, and causal supply timelines.
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

      {/* =========================================================================
          3. "HOW NEWSDECODED WORKS" (Exact match to Image 4 & 5)
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-peach p-8 sm:p-12 shadow-md space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] tracking-tight">
                How NewsDecoded Works
              </h2>
              <p className="text-sm sm:text-base text-[#73565C] mt-1 font-medium max-w-xl">
                Use multiple AIs side-by-side for no cost. Provide feedback to win intelligence credits that let you keep prompting.
              </p>
            </div>

            {/* Rotating LEARN Stamp Badge */}
            <RotatingStampBadge text="LEARN • LEARN • LEARN • " size={80} className="text-[#2E151B]" />
          </div>

          {/* Banner: Every AI for everyone with Model Badges */}
          <div className="rounded-[2.5rem] bg-[#2E151B] p-8 sm:p-10 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-md">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Every AI for everyone
              </h3>
              <p className="text-xs sm:text-sm text-[#D4BEC3]">
                Access over 800 of the best AIs from OpenAI, Google, Anthropic, and DeepSeek to automatically decode what actually matters.
              </p>
            </div>

            {/* Floating Model Badges */}
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
                Get side-by-side news breakdowns from multiple models for macro economics, technology, and politics. Compare and see which hits the mark.
              </p>
            </div>

            <div className="yupp-card-white p-8 space-y-4">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2E151B]">
                Give feedback, get more credits
              </h3>
              <p className="text-sm text-[#73565C] leading-relaxed">
                Feedback comes with more credits which allow you to keep using NewsDecoded and access over 800 of the best models available.
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
                Curious about how your feedback shapes the industry? Take a look at the Leaderboard to see how models stack up across categories and speed.
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

      {/* =========================================================================
          4. AI AUDIO BRIEF & DAILY SYNTHESIS PLAYER WIDGET
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="h-14 w-14 rounded-full bg-[#E04E15] text-white flex items-center justify-center shadow-lg shadow-orange-950/20 hover:scale-105 transition-all shrink-0"
              title={isPlayingAudio ? "Pause Audio Brief" : "Play Today's AI Audio Brief"}
            >
              {isPlayingAudio ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-1" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg sm:text-xl font-bold text-[#2E151B] dark:text-white">
                  Today&apos;s 3-Minute AI Audio Brief
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Daily Podcast
                </span>
              </div>
              <p className="text-xs text-[#73565C] dark:text-[#D4BEC3] mt-0.5">
                Listen to a distilled multi-model audio briefing of today&apos;s most critical global stories.
              </p>
            </div>
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex items-center gap-1.5 h-10 px-4 py-2 rounded-2xl bg-secondary/80">
            {[40, 70, 30, 95, 55, 80, 100, 60, 45, 85, 50, 90, 35, 75, 85, 45].map((h, i) => (
              <span
                key={i}
                style={{
                  height: isPlayingAudio ? `${Math.max(20, (h * Math.random()).toFixed(0))}%` : `${h}%`,
                  transition: "height 0.2s ease",
                }}
                className={cn(
                  "w-1.5 rounded-full",
                  i <= 8 ? "bg-[#E04E15]" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WARM EMOTIONAL QUOTE SECTION
         ========================================================================= */}
      <section className="mx-auto max-w-4xl px-4 text-center py-12">
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2E151B] dark:text-[#FFF1E8] tracking-tight mb-4">
          Built with love, shaped by a million voices.
        </h2>
        <p className="text-sm sm:text-base text-[#73565C] dark:text-[#BFA8AD] leading-relaxed max-w-2xl mx-auto">
          To every user who asked a question, compared a response, cast a vote, or shared a decoded story: you make NewsDecoded what it is. We are grateful for every prompt, every piece of feedback, and every moment you spend with us.
        </p>
        <span className="block mt-4 text-xs font-bold uppercase tracking-widest text-[#E04E15]">
          — The NewsDecoded Team
        </span>
      </section>
    </div>
  );
}
