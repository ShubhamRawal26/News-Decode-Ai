"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "./auth-provider";
import { YuppLogo } from "@/components/yupp/yupp-logo";
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
  const [showPassword, setShowPassword] = useState(false);
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
      toast.success("Welcome to NewsDecoded");
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md rounded-[2.5rem] bg-card p-7 sm:p-9 shadow-2xl border border-border z-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Brand Header */}
            <div className="mb-4">
              <YuppLogo size={30} showText={true} />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-1">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 font-medium">
              {mode === "signin"
                ? "Sign in to sync your saved stories, topics, and reading history."
                : "Join to personalize your intelligence feed across devices."}
            </p>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={onGoogle}
              disabled={googleBusy}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-card dark:bg-white text-foreground dark:text-[#2E151B] border border-border px-4 py-3 text-xs sm:text-sm font-bold hover:bg-secondary/60 dark:hover:bg-white/90 shadow-sm transition-all disabled:opacity-60"
            >
              {googleBusy ? (
                <Loader2 size={18} className="animate-spin text-[#E04E15]" />
              ) : (
                <GoogleIcon />
              )}
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Email Form */}
            <form onSubmit={onEmail} className="space-y-3">
              {mode === "signup" && (
                <Field icon={<UserIcon size={15} />}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium placeholder:text-muted-foreground text-foreground"
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
                  className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium placeholder:text-muted-foreground text-foreground"
                />
              </Field>
              <Field icon={<Lock size={15} />}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-transparent outline-none text-xs sm:text-sm font-medium placeholder:text-muted-foreground text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </Field>

              <button
                type="submit"
                disabled={busy}
                className="btn-yupp-primary w-full justify-center py-3 text-xs sm:text-sm font-bold shadow-md shadow-orange-950/20 disabled:opacity-60 mt-1"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : (
                  <>
                    <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-bold text-[#E04E15] hover:underline transition-colors"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>

            {/* Security Guarantee */}
            <div className="mt-4 pt-3 border-t border-border flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-muted-foreground font-medium">
              <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
              <span>256-Bit Encrypted & Privacy Protected</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full bg-secondary/50 border border-border px-4 py-2.5 focus-within:border-[#E04E15] focus-within:ring-2 focus-within:ring-[#E04E15]/20 transition-all">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
