"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-flex h-9 w-9 rounded-[0.25rem] border border-line" aria-hidden />;
  }

  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-[0.25rem] border border-line bg-bg-elevated text-fg transition hover:bg-brand-soft"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
