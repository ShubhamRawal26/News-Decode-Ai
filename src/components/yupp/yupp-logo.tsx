"use client";

import { cn } from "@/lib/utils";

interface YuppLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function YuppLogo({ className, size = 28, showText = true }: YuppLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Signature Multi-Color Sunburst / Asterisk Pinwheel */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-45"
      >
        <line x1="20" y1="4" x2="20" y2="12" stroke="#E04E15" strokeWidth="4" strokeLinecap="round" />
        <line x1="31.3" y1="8.7" x2="25.6" y2="14.4" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <line x1="36" y1="20" x2="28" y2="20" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
        <line x1="31.3" y1="31.3" x2="25.6" y2="25.6" stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="36" x2="20" y2="28" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
        <line x1="8.7" y1="31.3" x2="14.4" y2="25.6" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="20" x2="12" y2="20" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        <line x1="8.7" y1="8.7" x2="14.4" y2="14.4" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-foreground font-sans">
          NewsDecoded<span className="text-[#E04E15]">AI</span>
        </span>
      )}
    </div>
  );
}

export function RotatingStampBadge({
  text = "DECODE • DECODE • DECODE • ",
  size = 76,
  className,
}: {
  text?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative shrink-0 flex items-center justify-center select-none rotate-badge", className)}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} className="overflow-visible">
        <path
          id="stampCircle"
          d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          fill="none"
        />
        <text className="text-[10.5px] uppercase font-bold tracking-widest fill-current opacity-70">
          <textPath href="#stampCircle">{text}</textPath>
        </text>
      </svg>
    </div>
  );
}
