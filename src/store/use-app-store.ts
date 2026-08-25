"use client";

import { useCallback } from "react";
import { create } from "zustand";
import type { NewsArticle } from "@/lib/news";
import { useAuth } from "@/components/auth/auth-provider";

export type View =
  | { name: "home" }
  | { name: "category"; slug: string }
  | { name: "article"; id: string }
  | { name: "dashboard" }
  | { name: "search"; q: string }
  | { name: "date"; date: string };

interface AppState {
  view: View;
  history: View[];
  refreshKey: number;
  searchQuery: string;
  // user-data mirrors (kept in sync with Firebase via auth provider)
  savedIds: Set<string>;
  followedTopics: Set<string>;
  historyIds: string[];
  // local guest fallback (in-memory only, before sign-in)
  guestSaved: Set<string>;
  guestFollowed: Set<string>;

  go: (v: View) => void;
  back: () => void;
  setSavedIds: (ids: string[]) => void;
  setFollowedTopics: (t: string[]) => void;
  setHistoryIds: (ids: string[]) => void;
  toggleSavedLocal: (id: string) => void;
  toggleFollowedLocal: (t: string) => void;
  bumpRefresh: () => void;
  setSearchQuery: (q: string) => void;
  // merge guest data into a freshly signed-in user
  consumeGuest: () => { saved: string[]; followed: string[] };
}

export const useAppStore = create<AppState>((set, get) => ({
  view: { name: "home" },
  history: [],
  refreshKey: 0,
  searchQuery: "",
  savedIds: new Set(),
  followedTopics: new Set(),
  historyIds: [],
  guestSaved: new Set(),
  guestFollowed: new Set(),

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
  setHistoryIds: (ids) => set({ historyIds: ids }),
  toggleSavedLocal: (id) => {
    const s = new Set(get().savedIds);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    // also track in guest fallback
    const g = new Set(get().guestSaved);
    if (g.has(id)) g.delete(id);
    else g.add(id);
    set({ savedIds: s, guestSaved: g });
  },
  toggleFollowedLocal: (t) => {
    const s = new Set(get().followedTopics);
    if (s.has(t)) s.delete(t);
    else s.add(t);
    const g = new Set(get().guestFollowed);
    if (g.has(t)) g.delete(t);
    else g.add(t);
    set({ followedTopics: s, guestFollowed: g });
  },
  bumpRefresh: () => set({ refreshKey: get().refreshKey + 1 }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  consumeGuest: () => {
    const saved = [...get().guestSaved];
    const followed = [...get().guestFollowed];
    set({ guestSaved: new Set(), guestFollowed: new Set() });
    return { saved, followed };
  },
}));

// ---------- Hook: high-level save / follow that talks to Firebase ----------

import { toggleSaved, toggleFollowed, recordHistory } from "@/lib/firebase/user-data";

export function useUserActions() {
  const { user } = useAuth();
  const { toggleSavedLocal, toggleFollowedLocal } = useAppStore();

  const save = useCallback(async (articleId: string): Promise<boolean> => {
    toggleSavedLocal(articleId); // optimistic
    if (user) {
      try {
        const saved = await toggleSaved(user, articleId);
        if (!saved) toggleSavedLocal(articleId); // revert if actually removed
        return saved;
      } catch {
        toggleSavedLocal(articleId); // revert
        return false;
      }
    }
    return get().savedIds.has(articleId);
  }, [user, toggleSavedLocal]);

  const follow = useCallback(async (topic: string): Promise<boolean> => {
    toggleFollowedLocal(topic); // optimistic
    if (user) {
      try {
        const followed = await toggleFollowed(user, topic);
        if (!followed) toggleFollowedLocal(topic);
        return followed;
      } catch {
        toggleFollowedLocal(topic);
        return false;
      }
    }
    return get().followedTopics.has(topic);
  }, [user, toggleFollowedLocal]);

  const markRead = useCallback(async (articleId: string) => {
    if (user) {
      try {
        await recordHistory(user, articleId);
      } catch {
        /* ignore */
      }
    }
  }, [user]);

  return { save, follow, markRead };
}

// accessor for non-hook contexts
function get() {
  return useAppStore.getState();
}
