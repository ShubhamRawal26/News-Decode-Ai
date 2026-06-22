"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  variant?: "default" | "gradient" | "ghost";
}

export function MagneticButton({
  children,
  onClick,
  className,
  strength = 0.4,
  variant = "default",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        reset();
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        variant === "default" && "bg-foreground text-background px-5 py-2.5 text-sm",
        variant === "gradient" &&
          "text-white px-6 py-3 text-sm shadow-lg shadow-violet-500/25 bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] bg-[length:200%_100%] hover:bg-[position:100%_0]",
        variant === "ghost" && "text-foreground px-5 py-2.5 text-sm hover:bg-foreground/5",
        className,
      )}
    >
      {hover && variant === "gradient" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-md bg-[linear-gradient(110deg,#6366f1,#a855f7)]" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
