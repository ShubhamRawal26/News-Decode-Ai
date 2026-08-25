"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "./auth-provider";
import { useAppStore } from "@/store/use-app-store";
import { toggleSaved, toggleFollowed } from "@/lib/firebase/user-data";

// Mirrors Firebase user data into the app store, and merges any
// guest (pre-sign-in) saved/followed data into the user's account
// the moment they sign in.
export function UserSync() {
  const { user, userData } = useAuth();
  const {
    setSavedIds,
    setFollowedTopics,
    setHistoryIds,
    consumeGuest,
  } = useAppStore();
  const mergedRef = useRef(false);

  // mirror live user data -> store
  useEffect(() => {
    setSavedIds(userData.savedIds);
    setFollowedTopics(userData.followedTopics);
    setHistoryIds(userData.historyIds);
  }, [userData, setSavedIds, setFollowedTopics, setHistoryIds]);

  // on sign-in, merge guest data into the account
  useEffect(() => {
    if (!user || mergedRef.current) return;
    mergedRef.current = true;
    const { saved, followed } = consumeGuest();
    (async () => {
      for (const id of saved) {
        try {
          await toggleSaved(user, id);
        } catch {}
      }
      for (const t of followed) {
        try {
          await toggleFollowed(user, t);
        } catch {}
      }
    })();
  }, [user, consumeGuest]);

  return null;
}
