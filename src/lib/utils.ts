import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { riskFromModel } from "@/lib/scoring";

export function formatPercent(probability: number) {
  return `${Math.round(probability * 100)}%`;
}
