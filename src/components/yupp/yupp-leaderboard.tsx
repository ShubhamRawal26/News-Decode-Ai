"use client";

import { useState } from "react";
import { Trophy, Medal, Star, ArrowUpRight, Zap, ShieldCheck, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_LEADERBOARD = [
  { rank: 1, name: "Claude 3.7 Sonnet", provider: "Anthropic", elo: 1342, winRate: "78.4%", latency: "580ms", category: "Deep Reasoning" },
  { rank: 2, name: "DeepSeek R1", provider: "DeepSeek", elo: 1328, winRate: "76.1%", latency: "640ms", category: "First Principles" },
  { rank: 3, name: "GPT-4.5 Omni", provider: "OpenAI", elo: 1315, winRate: "74.8%", latency: "480ms", category: "Market Synthesis" },
  { rank: 4, name: "Gemini 2.5 Flash", provider: "Google DeepMind", elo: 1290, winRate: "71.2%", latency: "220ms", category: "Real-time Telemetry" },
  { rank: 5, name: "Grok 3 Beta", provider: "xAI", elo: 1276, winRate: "68.5%", latency: "510ms", category: "Real-time X Feeds" },
];

export function YuppLeaderboard() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Trophy size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground">Global AI Model Leaderboard</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Daily Updated
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Evaluated on 10,000+ real-time news syntheses, factual accuracy & impact forecasts.
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/70 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Model & Provider</th>
                <th className="py-3 px-4">Specialization</th>
                <th className="py-3 px-4">Arena ELO</th>
                <th className="py-3 px-4">Community Win Rate</th>
                <th className="py-3 px-4">Avg Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {MODEL_LEADERBOARD.map((row) => (
                <tr key={row.name} className="hover:bg-secondary/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold">
                    <span className={cn(
                      "inline-flex items-center justify-center h-6 w-6 rounded-full text-[11px]",
                      row.rank === 1 ? "bg-amber-500/10 text-amber-500 font-extrabold" :
                      row.rank === 2 ? "bg-slate-500/10 text-slate-400 font-extrabold" :
                      row.rank === 3 ? "bg-amber-700/10 text-amber-700 font-extrabold" :
                      "text-muted-foreground"
                    )}>
                      #{row.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-foreground">{row.name}</div>
                    <div className="text-[10px] text-muted-foreground">{row.provider}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[11px] font-medium">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-primary">{row.elo}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{row.winRate}</td>
                  <td className="py-3.5 px-4 text-muted-foreground font-mono">{row.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
