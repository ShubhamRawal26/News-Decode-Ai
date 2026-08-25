// User data service — reads/writes per-user data to Firebase Realtime Database.
// News article data stays in Prisma/SQLite; this is ONLY for user-specific data:
// saved articles, followed topics, reading history.

import { ref, get, set, remove, onValue, push, serverTimestamp } from "firebase/database";
import { db } from "./client";
import type { User } from "firebase/auth";

export interface UserData {
  savedIds: string[];
  followedTopics: string[];
  historyIds: string[]; // ordered most-recent-first
}

const EMPTY: UserData = { savedIds: [], followedTopics: [], historyIds: [] };

function userRoot(user: User) {
  return `users/${user.uid}`;
}

// ---------- Saved articles ----------

export async function toggleSaved(user: User, articleId: string): Promise<boolean> {
  const r = ref(db, `${userRoot(user)}/saved/${articleId}`);
  const snap = await get(r);
  if (snap.exists()) {
    await remove(r);
    return false;
  }
  await set(r, serverTimestamp());
  return true;
}

export async function isSaved(user: User, articleId: string): Promise<boolean> {
  const snap = await get(ref(db, `${userRoot(user)}/saved/${articleId}`));
  return snap.exists();
}

// ---------- Followed topics ----------

export async function toggleFollowed(user: User, topic: string): Promise<boolean> {
  const key = topic.replace(/[.#$/[\]]/g, "_");
  const r = ref(db, `${userRoot(user)}/followed/${key}`);
  const snap = await get(r);
  if (snap.exists()) {
    await remove(r);
    return false;
  }
  await set(r, { topic, ts: serverTimestamp() });
  return true;
}

// ---------- Reading history ----------

export async function recordHistory(user: User, articleId: string): Promise<void> {
  const r = ref(db, `${userRoot(user)}/history/${articleId}`);
  await set(r, serverTimestamp());
}

// ---------- Bulk load ----------

export async function loadUserData(user: User): Promise<UserData> {
  const snap = await get(ref(db, userRoot(user)));
  if (!snap.exists()) return EMPTY;
  const val = snap.val() as {
    saved?: Record<string, unknown>;
    followed?: Record<string, { topic: string }>;
    history?: Record<string, number>;
  };
  const savedIds = val.saved ? Object.keys(val.saved) : [];
  const followedTopics = val.followed
    ? Object.values(val.followed).map((v) => v.topic)
    : [];
  const historyEntries = val.history
    ? (Object.entries(val.history) as [string, number][])
        .sort((a, b) => (b[1] || 0) - (a[1] || 0))
        .map(([id]) => id)
    : [];
  return { savedIds, followedTopics, historyIds: historyEntries };
}

// ---------- Live subscription ----------

export function subscribeUserData(
  user: User,
  cb: (data: UserData) => void,
): () => void {
  const r = ref(db, userRoot(user));
  const unsub = onValue(r, (snap) => {
    if (!snap.exists()) {
      cb(EMPTY);
      return;
    }
    const val = snap.val() as {
      saved?: Record<string, unknown>;
      followed?: Record<string, { topic: string }>;
      history?: Record<string, number>;
    };
    const savedIds = val.saved ? Object.keys(val.saved) : [];
    const followedTopics = val.followed
      ? Object.values(val.followed).map((v) => v.topic)
      : [];
    const historyEntries = val.history
      ? (Object.entries(val.history) as [string, number][])
          .sort((a, b) => (b[1] || 0) - (a[1] || 0))
          .map(([id]) => id)
      : [];
    cb({ savedIds, followedTopics, historyIds: historyEntries });
  });
  return unsub;
}

// ---------- Profile ----------

export async function ensureProfile(user: User): Promise<void> {
  const r = ref(db, `${userRoot(user)}/profile`);
  const snap = await get(r);
  if (!snap.exists()) {
    await set(r, {
      email: user.email,
      name: user.displayName || null,
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
    });
  }
}

export { push };
