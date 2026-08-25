"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { ensureProfile, subscribeUserData, type UserData } from "@/lib/firebase/user-data";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  userData: UserData;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const EMPTY_DATA: UserData = { savedIds: [], followedTopics: [], historyIds: [] };

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  userData: EMPTY_DATA,
  signInWithGoogle: async () => {},
  signUpWithEmail: async () => {},
  signInWithEmail: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>(EMPTY_DATA);

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        try {
          await ensureProfile(u);
        } catch {
          /* profile ensure best-effort */
        }
      } else {
        setUserData(EMPTY_DATA);
      }
    });
    return () => unsub();
  }, []);

  // live-subscribe user data when signed in
  useEffect(() => {
    if (!user || !auth) return;
    const unsub = subscribeUserData(user, (data) => setUserData(data));
    return () => unsub();
  }, [user]);

  const signInWithGoogle = useCallback(async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string, name: string) => {
    if (!auth) return;
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    await ensureProfile(cred.user);
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!auth) return;
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    if (!auth) return;
    await fbSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, userData, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
