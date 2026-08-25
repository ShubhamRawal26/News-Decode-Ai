"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";
import { todayEditionDate, EDITION_START, formatEditionDate, editionDayOfWeek } from "@/lib/dates";

interface DatesResponse {
  available: string[];
  today: string;
  start: string;
  range: string[];
}

export function DatePickerButton() {
  const { view, go } = useAppStore();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DatesResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    view.name === "date" ? view.date : todayEditionDate(),
  );
  // local month cursor for the calendar grid
  const [cursor, setCursor] = useState<Date>(new Date());

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch("/api/news/dates")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setData(d);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [open]);

  const activeDate = view.name === "date" ? view.date : null;
  const availableSet = new Set(data?.available || []);
  const today = data?.today || todayEditionDate();

  // build the month grid for `cursor`
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const dateKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const isSelectable = (d: Date) => {
    const key = dateKey(d);
    return key >= EDITION_START && key <= today;
  };

  const hasNews = (d: Date) => availableSet.has(dateKey(d));

  const prevMonth = () => {
    const minDate = new Date(EDITION_START + "T00:00:00");
    const prev = new Date(year, month - 1, 1);
    if (prev < minDate) return;
    setCursor(prev);
  };
  const nextMonth = () => {
    const todayD = new Date(today + "T00:00:00");
    const next = new Date(year, month + 1, 1);
    if (next > todayD) return;
    setCursor(next);
  };

  const pick = (d: Date) => {
    if (!isSelectable(d)) return;
    setSelectedDate(dateKey(d));
  };

  const goToDate = (dateStr: string) => {
    go({ name: "date", date: dateStr });
    setOpen(false);
  };

  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(cursor);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-all",
          activeDate ? "bg-foreground text-background" : "hover:bg-foreground/5",
        )}
        aria-label="Browse by date"
      >
        <CalendarIcon size={15} />
        <span className="hidden sm:inline">{activeDate ? formatEditionDate(activeDate) : "Archive"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-start justify-center pt-24 px-4"
          >
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="glass-strong relative w-full max-w-md rounded-3xl p-6 shadow-2xl"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <CalendarIcon size={16} className="text-violet-600" />
                <h3 className="font-display text-xl font-normal tracking-tight">News archive</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Browse daily editions. News since {formatEditionDate(EDITION_START)}.
              </p>

              {/* month nav */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold">{monthLabel}</span>
                <button
                  onClick={nextMonth}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* weekday header */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="text-center text-[10px] font-semibold text-muted-foreground py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* day grid */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (!d) return <div key={i} />;
                  const key = dateKey(d);
                  const selectable = isSelectable(d);
                  const has = hasNews(d);
                  const isSelected = key === selectedDate;
                  const isToday = key === today;
                  return (
                    <button
                      key={i}
                      onClick={() => pick(d)}
                      disabled={!selectable}
                      className={cn(
                        "relative aspect-square rounded-xl text-sm font-medium transition-all",
                        !selectable && "text-muted-foreground/30 cursor-not-allowed",
                        selectable && !isSelected && "hover:bg-foreground/5 text-foreground",
                        isSelected && "bg-[linear-gradient(135deg,#6366f1,#a855f7)] text-white shadow-lg shadow-violet-500/30",
                        isToday && !isSelected && "ring-1 ring-violet-500/40",
                      )}
                    >
                      {d.getDate()}
                      {has && selectable && (
                        <span
                          className={cn(
                            "absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full",
                            isSelected ? "bg-white" : "bg-violet-500",
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* legend */}
              <div className="flex items-center gap-4 mt-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" /> News available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded ring-1 ring-violet-500/40" /> Today
                </span>
              </div>

              {/* selected preview + go button */}
              <div className="mt-5 pt-5 border-t border-foreground/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Selected</div>
                    <div className="text-sm font-medium">
                      {formatEditionDate(selectedDate)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{editionDayOfWeek(selectedDate)}</div>
                  </div>
                  <button
                    onClick={() => goToDate(selectedDate)}
                    className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/25 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all"
                  >
                    View edition
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
