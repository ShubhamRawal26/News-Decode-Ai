"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Sparkles, Menu, X, ArrowLeft, LogOut } from "lucide-react";
import { CATEGORIES } from "@/lib/news";
import { useAppStore } from "@/store/use-app-store";
import { useAuth } from "@/components/auth/auth-provider";
import { DatePickerButton } from "./date-picker";
import { cn } from "@/lib/utils";

export function PremiumNav({ onAuthRequired }: { onAuthRequired?: (mode: "signin" | "signup") => void }) {
  const { view, go, back, history } = useAppStore();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    go({ name: "search", q: q.trim() });
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const activeCat = view.name === "category" ? view.slug : view.name === "home" ? "home" : "";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "glass-nav py-2.5" : "py-4 bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => go({ name: "home" })}
              className="group flex items-center gap-2.5 shrink-0"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1,#a855f7)] shadow-lg shadow-violet-500/30">
                <Sparkles size={18} className="text-white" />
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight">
                  NewsDecoded<span className="text-gradient">AI</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                  Intelligence, decoded
                </span>
              </span>
            </button>

            {/* Center nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-1 glass rounded-full p-1">
              <NavBtn active={activeCat === "home"} onClick={() => go({ name: "home" })}>
                Home
              </NavBtn>
              {CATEGORIES.map((c) => (
                <NavBtn
                  key={c.slug}
                  active={activeCat === c.slug}
                  onClick={() => go({ name: "category", slug: c.slug })}
                >
                  {c.label.replace(" & Technology", " & Tech").replace(" News", "")}
                </NavBtn>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  onClick={back}
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft size={17} />
                </button>
              )}
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Search"
              >
                <Search size={17} />
              </button>
              <button
                onClick={() => go({ name: "dashboard" })}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-all",
                  view.name === "dashboard"
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground/5",
                )}
              >
                <LayoutDashboard size={15} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>

              {/* Date archive */}
              <DatePickerButton />

              {/* Auth */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-white/60 shadow-md"
                    aria-label="Account"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "avatar"} className="h-full w-full object-cover" />
                    ) : (
                      <span className="h-full w-full bg-[linear-gradient(135deg,#6366f1,#a855f7)] text-white text-sm font-semibold flex items-center justify-center">
                        {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-11 z-50 w-60 glass-strong rounded-2xl p-2 shadow-2xl"
                        >
                          <div className="px-3 py-2.5 border-b border-foreground/5 mb-1">
                            <div className="text-sm font-semibold truncate">{user.displayName || "Account"}</div>
                            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                          </div>
                          <button
                            onClick={() => { go({ name: "dashboard" }); setMenuOpen(false); }}
                            className="w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-foreground/5 transition-colors flex items-center gap-2"
                          >
                            <LayoutDashboard size={15} /> Dashboard
                          </button>
                          <button
                            onClick={async () => { await signOut(); setMenuOpen(false); }}
                            className="w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-foreground/5 transition-colors flex items-center gap-2 text-rose-600"
                          >
                            <LogOut size={15} /> Sign out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => onAuthRequired?.("signin")}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-3.5 text-sm font-medium shadow-lg shadow-violet-500/25 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all"
                >
                  Sign in
                </button>
              )}

              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                onSubmit={submitSearch}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
                  <Search size={18} className="text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search stories, topics, companies…"
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  />
                  <kbd className="hidden sm:inline-flex text-[10px] font-medium text-muted-foreground border rounded px-1.5 py-0.5">
                    ↵
                  </kbd>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[78%] max-w-sm glass-strong p-6 pt-24 flex flex-col gap-1.5"
            >
              <MobileNavBtn active={view.name === "home"} onClick={() => { go({ name: "home" }); setMobileOpen(false); }}>
                Home
              </MobileNavBtn>
              {CATEGORIES.map((c) => (
                <MobileNavBtn
                  key={c.slug}
                  active={view.name === "category" && view.slug === c.slug}
                  onClick={() => { go({ name: "category", slug: c.slug }); setMobileOpen(false); }}
                >
                  {c.label}
                </MobileNavBtn>
              ))}
              <MobileNavBtn active={view.name === "dashboard"} onClick={() => { go({ name: "dashboard" }); setMobileOpen(false); }}>
                Dashboard
              </MobileNavBtn>
              {!user && (
                <button
                  onClick={() => { onAuthRequired?.("signin"); setMobileOpen(false); }}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-4 py-3 text-sm font-medium shadow-lg shadow-violet-500/25"
                >
                  Sign in to sync your data
                </button>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavBtn({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
        active ? "text-background" : "text-foreground/70 hover:text-foreground",
      )}
    >
      {active && (
        <motion.span
          layoutId="navActive"
          className="absolute inset-0 rounded-full bg-foreground"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function MobileNavBtn({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl px-4 py-3 text-left text-[15px] font-medium transition-colors",
        active ? "bg-foreground text-background" : "hover:bg-foreground/5",
      )}
    >
      {children}
    </button>
  );
}
