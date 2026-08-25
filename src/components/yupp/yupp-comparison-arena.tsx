"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp, ThumbsDown, Copy, Check, Bookmark, Sparkles,
  Bot, Cpu, Zap, ArrowRight, Layers, Coins, Share2, Globe2
} from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

interface ComparisonArenaProps {
  featuredArticle: NewsArticle;
  quickTakeActive?: boolean;
}

interface ModelResponse {
  modelId: string;
  modelName: string;
  provider: string;
  badge: string;
  speed: string;
  quality: string;
  summary: string;
  quickTake: string;
  analysisPoints: string[];
  prediction: string;
}

export function YuppComparisonArena({ featuredArticle, quickTakeActive = false }: ComparisonArenaProps) {
  const go = useAppStore((s) => s.go);
  const [votedModel, setVotedModel] = useState<string | null>(null);
  const [copiedModel, setCopiedModel] = useState<string | null>(null);
  const [earnedCredits, setEarnedCredits] = useState(false);

  const responses: ModelResponse[] = [
    {
      modelId: "claude",
      modelName: "Claude 3.7 Sonnet",
      provider: "Anthropic",
      badge: "Deep Reasoning",
      speed: "580ms",
      quality: "98.5%",
      summary: featuredArticle.whatHappened,
      quickTake: `⚡ QuickTake: ${featuredArticle.title}. Primary catalyst: ${featuredArticle.subcategory || "Global shift"}. Impact: High.`,
      analysisPoints: [
        `Core Driver: ${featuredArticle.whyItMatters}`,
        `Affected Entities: ${featuredArticle.whoIsAffected}`,
      ],
      prediction: featuredArticle.futureImpact || featuredArticle.whatHappensNext,
    },
    {
      modelId: "gpt4",
      modelName: "GPT-4.5 Omni",
      provider: "OpenAI",
      badge: "Market Synthesis",
      speed: "480ms",
      quality: "97.2%",
      summary: `Market intelligence indicates significant strategic reallocation. ${featuredArticle.summary}`,
      quickTake: `⚡ Market Take: Capital re-pricing underway. Regulatory clarity expected within 6 months.`,
      analysisPoints: [
        `Economic Catalyst: ${featuredArticle.whyItMatters}`,
        `Next Milestone: ${featuredArticle.whatHappensNext}`,
      ],
      prediction: `Expect accelerated enterprise adoption across tier-1 operators with direct margin expansion.`,
    },
    {
      modelId: "deepseek",
      modelName: "DeepSeek R1",
      provider: "DeepSeek",
      badge: "First Principles",
      speed: "640ms",
      quality: "97.9%",
      summary: `Analyzing structural dependencies: ${featuredArticle.whatHappened} The systemic bottleneck shifts to infrastructure readiness.`,
      quickTake: `⚡ Logic Take: Direct consequence of supply constraints. Next phase unlocks scalable efficiency.`,
      analysisPoints: [
        `Systemic Shift: ${featuredArticle.whoIsAffected}`,
        `Causal Trajectory: ${featuredArticle.whatHappensNext}`,
      ],
      prediction: featuredArticle.futureImpact || "Secondary feedback loops will emerge across global supply corridors.",
    },
  ];

  const handleVote = (modelId: string) => {
    setVotedModel(modelId);
    if (!earnedCredits) {
      setEarnedCredits(true);
    }
  };

  const handleCopy = (text: string, modelId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedModel(modelId);
    setTimeout(() => setCopiedModel(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      {/* Arena Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            <Zap size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Live Side-by-Side Model Arena</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Active Benchmark
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Story: <strong className="text-foreground">{featuredArticle.title}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {earnedCredits && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold"
            >
              <Coins size={14} />
              <span>+25 Yupp Credits Earned!</span>
            </motion.div>
          )}
          <button
            onClick={() => go({ name: "article", id: featuredArticle.id })}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <span>Full Story Dossier</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* 3-Column Side-by-Side Model Responses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {responses.map((resp) => {
          const isVoted = votedModel === resp.modelId;
          const isCopied = copiedModel === resp.modelId;

          return (
            <div
              key={resp.modelId}
              className={cn(
                "rounded-2xl p-5 bg-card border flex flex-col justify-between transition-all duration-300 relative",
                isVoted
                  ? "border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                  : "border-border hover:border-border/80 shadow-sm"
              )}
            >
              <div>
                {/* Model Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-primary font-bold">
                      <Bot size={16} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground flex items-center gap-1.5">
                        <span>{resp.modelName}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{resp.provider}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                    {resp.badge}
                  </span>
                </div>

                {/* Telemetry metrics */}
                <div className="flex items-center gap-3 mb-4 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Speed: <strong className="text-foreground">{resp.speed}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Quality: <strong className="text-foreground">{resp.quality}</strong>
                  </span>
                </div>

                {/* Content */}
                <div className="text-xs text-foreground/90 space-y-3 leading-relaxed">
                  {quickTakeActive ? (
                    <div className="p-3 rounded-xl bg-secondary/80 border border-border font-medium text-foreground">
                      {resp.quickTake}
                    </div>
                  ) : (
                    <>
                      <p className="font-normal text-muted-foreground">{resp.summary}</p>
                      <div className="p-3 rounded-xl bg-secondary/60 border border-border/80 space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          Key Dimensions
                        </div>
                        {resp.analysisPoints.map((pt, i) => (
                          <div key={i} className="text-[11px] text-foreground flex items-start gap-1.5">
                            <span className="text-primary">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-border/70 text-[11px]">
                        <span className="font-bold text-primary block mb-0.5">Forecast Horizon:</span>
                        <span className="text-muted-foreground">{resp.prediction}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Actions & Voting */}
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleVote(resp.modelId)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors",
                      isVoted
                        ? "bg-primary text-white"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                    title="Vote this response as best"
                  >
                    <ThumbsUp size={12} />
                    <span>{isVoted ? "Best Answer" : "Vote Best"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <button
                    onClick={() => handleCopy(resp.summary + "\n" + resp.prediction, resp.modelId)}
                    className="p-1.5 rounded-lg hover:bg-secondary hover:text-foreground transition-colors"
                    title="Copy AI analysis"
                  >
                    {isCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
