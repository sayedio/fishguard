import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2 focus-ring rounded-[0.25rem]", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[0.25rem] bg-brand dark:bg-accent">
        <svg viewBox="0 0 32 32" className="h-4 w-4" aria-hidden>
          <path
            d="M16 4c-4.2 1.9-7.2 2.3-9.5 2.3v8.2c0 6.3 4.2 10.1 9.5 12 5.3-1.9 9.5-5.7 9.5-12V6.3C23.2 6.3 20.2 5.9 16 4Z"
            className="fill-white dark:fill-[#0a0c10]"
          />
          <path
            d="M11.5 16.2 14.4 19l6-6.2"
            fill="none"
            className="stroke-brand dark:stroke-accent"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-[0.95rem] font-bold tracking-tight text-fg">PhishGuard</span>
      )}
      <span className="sr-only">PhishGuard home</span>
    </Link>
  );
}
