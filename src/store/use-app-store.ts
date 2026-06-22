"use client";

import { create } from "zustand";
import type { NewsArticle } from "@/lib/news";

export type View =
  | { name: "home" }
  | { name: "category"; slug: string }
  | { name: "article"; id: string }
  | { name: "dashboard" }
  | { name: "search"; q: string };

interface AppState {
  view: View;
  history: View[];
  savedIds: Set<string>;
  followedTopics: Set<string>;
  refreshKey: number;
  searchQuery: string;

  go: (v: View) => void;
  back: () => void;
  setSavedIds: (ids: string[]) => void;
  setFollowedTopics: (t: string[]) => void;
  toggleSavedLocal: (id: string) => void;
  toggleFollowedLocal: (t: string) => void;
  bumpRefresh: () => void;
  setSearchQuery: (q: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  view: { name: "home" },
  history: [],
  savedIds: new Set(),
  followedTopics: new Set(),
  refreshKey: 0,
  searchQuery: "",

  go: (v) => {
    const current = get().view;
    if (current.name === v.name && JSON.stringify(current) === JSON.stringify(v)) return;
    set({ view: v, history: [...get().history, current].slice(-30) });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  },
  back: () => {
    const h = [...get().history];
    if (h.length === 0) {
      set({ view: { name: "home" } });
      return;
    }
    const prev = h.pop()!;
    set({ view: prev, history: h });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  },
  setSavedIds: (ids) => set({ savedIds: new Set(ids) }),
  setFollowedTopics: (t) => set({ followedTopics: new Set(t) }),
  toggleSavedLocal: (id) => {
    const s = new Set(get().savedIds);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    set({ savedIds: s });
  },
  toggleFollowedLocal: (t) => {
    const s = new Set(get().followedTopics);
    if (s.has(t)) s.delete(t);
    else s.add(t);
    set({ followedTopics: s });
  },
  bumpRefresh: () => set({ refreshKey: get().refreshKey + 1 }),
  setSearchQuery: (q) => set({ searchQuery: q }),
}));

export function isSaved(state: AppState, id: string) {
  return state.savedIds.has(id);
}
