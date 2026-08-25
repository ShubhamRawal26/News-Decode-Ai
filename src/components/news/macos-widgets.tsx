"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, TrendingDown, Play, Pause, Volume2,
  Sparkles, Globe2, Activity, Flame, Calendar,
  ArrowUpRight, Radio, RefreshCw, BarChart3
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { todayEditionDate, formatEditionDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

const MARKET_TICKERS = [
  { symbol: "S&P 500", name: "S&P 500 Index", val: "5,864.20", change: "+0.84%", isUp: true },
  { symbol: "NASDAQ", name: "Nasdaq Composite", val: "18,650.30", change: "+1.25%", isUp: true },
  { symbol: "BTC/USD", name: "Bitcoin", val: "$96,420", change: "+3.40%", isUp: true },
  { symbol: "CLEAN TECH", name: "Global Clean Energy", val: "$1,420.80", change: "+2.15%", isUp: true },
  { symbol: "BRENT", name: "Crude Oil", val: "$74.20", change: "-1.10%", isUp: false },
];

export function MacOSWidgets() {
  const go = useAppStore((s) => s.go);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38);
  const today = todayEditionDate();

  const toggleAudio = () => setIsPlaying((p) => !p);

  return (
    <section id="macos-widgets" className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 scroll-mt-28">
      {/* Widget Center Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full traffic-light-red" />
            <span className="h-3 w-3 rounded-full traffic-light-yellow" />
            <span className="h-3 w-3 rounded-full traffic-light-green" />
          </div>
          <span className="h-4 w-px bg-border mx-1" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            macOS Intelligence Widgets
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Radio size={12} className="text-emerald-500 animate-pulse" />
          <span>Live Telemetry</span>
        </div>
      </div>

      {/* Grid of macOS Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Widget 1: Live Market & Asset Ticker */}
        <div className="macos-window p-5 flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <BarChart3 size={15} className="text-primary" />
                <span className="text-xs font-semibold">Markets & Index</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Live
              </span>
            </div>
            <div className="space-y-2.5">
              {MARKET_TICKERS.slice(0, 3).map((item) => (
                <div key={item.symbol} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold">{item.symbol}</span>
                    <span className="text-[10px] text-muted-foreground block">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium">{item.val}</div>
                    <div className={cn("text-[10px] font-semibold flex items-center justify-end gap-0.5", item.isUp ? "text-emerald-500" : "text-rose-500")}>
                      {item.isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => go({ name: "category", slug: "markets" })}
            className="mt-4 text-[11px] font-medium text-primary hover:underline flex items-center justify-between pt-2 border-t border-border"
          >
            <span>Open Markets Desk</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Widget 2: AI Intelligence Impact & Sentiment Radar */}
        <div className="macos-window p-5 flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Activity size={15} className="text-violet-500" />
                <span className="text-xs font-semibold">Global AI Sentiment</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Score: 89
              </span>
            </div>

            {/* Sentiment Meter Bar */}
            <div className="mt-2 mb-3">
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>Positive (64%)</span>
                <span>Neutral (24%)</span>
                <span>Risk (12%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden flex">
                <div style={{ width: "64%" }} className="bg-emerald-500 h-full" />
                <div style={{ width: "24%" }} className="bg-sky-400 h-full" />
                <div style={{ width: "12%" }} className="bg-rose-500 h-full" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              AI scanning 2,400+ verified global sources. Global macro sentiment reflects high optimism in clean energy & deep tech.
            </p>
          </div>

          <div className="mt-4 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Avg Impact Score</span>
            <span className="font-semibold text-foreground">89 / 100</span>
          </div>
        </div>

        {/* Widget 3: AI Daily Audio Brief / Podcast Player */}
        <div className="macos-window p-5 flex flex-col justify-between hover:shadow-xl transition-all bg-gradient-to-br from-card to-primary/[0.04]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Volume2 size={15} className="text-primary" />
                <span className="text-xs font-semibold">AI Audio Brief</span>
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">3 min listen</span>
            </div>

            <div className="my-2">
              <div className="text-xs font-semibold text-foreground truncate">
                Today&apos;s Global Intelligence Synthesis
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Voiceover synthesized by AI
              </div>
            </div>

            {/* Simulated Animated Waveform */}
            <div className="flex items-center justify-between gap-1 h-8 my-3 px-1">
              {[40, 65, 30, 90, 45, 80, 100, 60, 35, 75, 50, 95, 30, 70, 85, 40].map((h, i) => (
                <span
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * Math.random()).toFixed(0))}%` : `${h}%`,
                    transition: "height 0.2s ease",
                  }}
                  className={cn(
                    "w-1 rounded-full",
                    i / 16 <= audioProgress / 100
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Player controls */}
          <div className="pt-2 border-t border-border flex items-center justify-between gap-3">
            <button
              onClick={toggleAudio}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-medium shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
              <span>{isPlaying ? "Pause Brief" : "Listen (3m)"}</span>
            </button>
            <span className="text-[10px] text-muted-foreground font-mono">01:14 / 03:20</span>
          </div>
        </div>

        {/* Widget 4: Active Topics & Calendar Snapshot */}
        <div className="macos-window p-5 flex flex-col justify-between hover:shadow-xl transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Flame size={15} className="text-rose-500" />
                <span className="text-xs font-semibold">Active Topic Radar</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{formatEditionDate(today)}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 my-1">
              {["Artificial Intelligence", "Clean Tech", "Semiconductors", "Macro", "Geopolitics", "Quantum"].map((t) => (
                <button
                  key={t}
                  onClick={() => go({ name: "search", q: t })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>#{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Daily Edition Ready</span>
            <button
              onClick={() => go({ name: "date", date: today })}
              className="font-medium text-primary hover:underline flex items-center gap-1"
            >
              <Calendar size={11} /> View Archive
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
