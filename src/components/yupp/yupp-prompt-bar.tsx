"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Bot, Cpu, Globe,
  Paperclip, Search, ChevronDown, Check, Zap, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const AVAILABLE_MODELS = [
  { id: "all", name: "Multi-Model Arena (All 3 Models)", provider: "Side-by-Side", badge: "ARENA" },
  { id: "claude", name: "Claude 3.7 Sonnet", provider: "Anthropic", badge: "Reasoning" },
  { id: "gpt4", name: "GPT-4.5 Omni", provider: "OpenAI", badge: "Synthesis" },
  { id: "deepseek", name: "DeepSeek R1", provider: "DeepSeek", badge: "Deep Logic" },
  { id: "gemini", name: "Gemini 2.5 Flash", provider: "Google DeepMind", badge: "Real-time" },
];

const SUGGESTIONS = [
  "⚡ Compare Top 3 Models on AI Chip Breakthrough",
  "📊 Global Semiconductor Supply Chain Forecast",
  "🌍 Clean Energy & Rare Earth Geopolitics",
  "🏦 Federal Reserve & Macro Interest Rate Outlook",
];

interface YuppPromptBarProps {
  onSearch: (q: string) => void;
}

export function YuppPromptBar({ onSearch }: YuppPromptBarProps) {
  const [query, setQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      {/* Center Hero Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
          <Sparkles size={13} />
          <span>Multi-Model AI Intelligence Arena</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          What news do you want to <span className="text-gradient">decode today?</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
          Query hundreds of verified global stories. Compare perspectives from Claude, GPT-4, DeepSeek & Gemini side-by-side.
        </p>
      </div>

      {/* Floating Prompt Box */}
      <div className="relative rounded-2xl bg-card border border-border shadow-xl p-3 sm:p-4 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all">
        {/* Model Selector Pill Row */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-border/80 text-xs">
          <div className="relative">
            <button
              type="button"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary hover:bg-foreground/10 text-foreground font-medium transition-colors border border-border"
            >
              <Bot size={14} className="text-primary" />
              <span>{selectedModel.name}</span>
              <ChevronDown size={12} className="opacity-60" />
            </button>

            {modelDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setModelDropdownOpen(false)} />
                <div className="absolute left-0 top-10 z-50 w-72 rounded-2xl bg-popover p-1.5 shadow-2xl border border-border">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Select Target Model
                  </div>
                  {AVAILABLE_MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(m);
                        setModelDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors",
                        selectedModel.id === m.id
                          ? "bg-primary text-white font-semibold"
                          : "hover:bg-secondary text-foreground"
                      )}
                    >
                      <div>
                        <div>{m.name}</div>
                        <div className="text-[10px] opacity-75">{m.provider}</div>
                      </div>
                      {selectedModel.id === m.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Globe size={13} className="text-emerald-500" />
            <span className="hidden sm:inline">Web Ingestion Active</span>
          </div>
        </div>

        {/* Input Text Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI to synthesize any news topic, compare models, or forecast market impact..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm sm:text-base font-normal py-1"
          />
          <button
            type="submit"
            disabled={!query.trim()}
            className={cn(
              "h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center text-white transition-all shadow-md",
              query.trim()
                ? "bg-primary hover:opacity-90 shadow-primary/30"
                : "bg-muted-foreground/30 opacity-50 cursor-not-allowed"
            )}
            title="Decode news"
          >
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-2 flex-wrap mt-3 justify-center">
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Zap size={11} className="text-amber-500" /> Quick Prompts:
        </span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSearch(s.replace(/^[^a-zA-Z0-9]+/, ""))}
            className="px-2.5 py-1 rounded-lg bg-card hover:bg-secondary text-[11px] text-muted-foreground hover:text-foreground transition-colors border border-border"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
