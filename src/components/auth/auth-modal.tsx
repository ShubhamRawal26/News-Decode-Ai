"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User as UserIcon, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "./auth-provider";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode?: "signin" | "signup";
}

export function AuthModal({ open, onClose, mode: initialMode = "signin" }: AuthModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  const onGoogle = async () => {
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
      toast.success("Welcome to NewsDecodedAI");
      onClose();
    } catch (e: any) {
      toast.error(e?.message?.includes("popup") ? "Sign-in popup was closed" : "Google sign-in failed");
    } finally {
      setGoogleBusy(false);
    }
  };

  const onEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (mode === "signup" && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password, name);
        toast.success("Account created — welcome!");
      } else {
        await signInWithEmail(email, password);
        toast.success("Welcome back");
      }
      onClose();
      setEmail("");
      setPassword("");
      setName("");
    } catch (e: any) {
      const msg = e?.code === "auth/invalid-credential"
        ? "Invalid email or password"
        : e?.code === "auth/email-already-in-use"
          ? "An account with this email already exists"
          : e?.message || "Authentication failed";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass-strong relative w-full max-w-md rounded-3xl p-7 sm:p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Close"
            >
              <X size={17} />
            </button>

            {/* brand */}
            <div className="flex items-center gap-2.5 mb-1">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1,#a855f7)] shadow-lg shadow-violet-500/30">
                <Sparkles size={17} className="text-white" />
              </span>
              <span className="font-semibold tracking-tight">
                NewsDecoded<span className="text-gradient">AI</span>
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight mt-3 mb-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {mode === "signin"
                ? "Sign in to sync your saved stories, topics, and reading history."
                : "Join to personalize your intelligence feed across devices."}
            </p>

            {/* Google */}
            <button
              onClick={onGoogle}
              disabled={googleBusy}
              className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-white border border-foreground/10 px-4 py-3 text-sm font-medium hover:bg-foreground/[0.02] transition-colors disabled:opacity-60"
            >
              {googleBusy ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </button>

            {/* divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-foreground/10" />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">or</span>
              <div className="h-px flex-1 bg-foreground/10" />
            </div>

            {/* email form */}
            <form onSubmit={onEmail} className="space-y-3">
              {mode === "signup" && (
                <Field icon={<UserIcon size={15} />}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  />
                </Field>
              )}
              <Field icon={<Mail size={15} />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </Field>
              <Field icon={<Lock size={15} />}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </Field>

              <button
                type="submit"
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-4 py-3 text-sm font-medium shadow-lg shadow-violet-500/25 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all disabled:opacity-60"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : (
                  <>
                    {mode === "signin" ? "Sign in" : "Create account"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* toggle */}
            <p className="text-center text-xs text-muted-foreground mt-5">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-semibold text-foreground hover:text-gradient transition-colors"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-foreground/[0.03] border border-foreground/10 px-3.5 py-3 focus-within:border-primary/40 focus-within:bg-foreground/[0.05] transition-colors">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
