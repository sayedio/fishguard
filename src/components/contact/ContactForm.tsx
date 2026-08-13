"use client";

import { FormEvent, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm({ defaultType = "contact" }: { defaultType?: "contact" | "review" }) {
  const [type, setType] = useState<"contact" | "review">(defaultType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name,
          email,
          message,
          rating: type === "review" ? rating : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      if (type === "review") {
        try {
          const key = "phishguard_reviews";
          const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
          prev.unshift({
            id: `local-${Date.now()}`,
            name,
            role: "Community",
            rating,
            text: message,
          });
          localStorage.setItem(key, JSON.stringify(prev.slice(0, 20)));
        } catch {
          /* ignore */
        }
      }

      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel p-5 sm:p-6">
      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ["contact", "Contact"],
            ["review", "Review"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={cn(
              "focus-ring rounded-[0.4rem] px-3 py-1.5 text-sm font-semibold",
              type === id ? "bg-brand text-white dark:bg-accent dark:text-[#0a0c10]" : "border border-line text-fg-muted",
            )}
            onClick={() => setType(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium text-fg">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-[0.35rem] border border-line bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>
        <label className="block text-sm font-medium text-fg">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring mt-1.5 w-full rounded-[0.35rem] border border-line bg-bg px-3 py-2 text-sm outline-none"
          />
        </label>
      </div>

      {type === "review" && (
        <div className="mt-4">
          <p className="text-sm font-medium text-fg">Rating</p>
          <div className="mt-1.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
              const value = i + 1;
              return (
                <button key={value} type="button" className="focus-ring rounded p-1" onClick={() => setRating(value)} aria-label={`${value} stars`}>
                  <Star className={cn("h-5 w-5", value <= rating ? "fill-warn text-warn" : "text-line")} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <label className="mt-4 block text-sm font-medium text-fg">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-[0.35rem] border border-line bg-bg px-3 py-2 text-sm outline-none"
          placeholder={type === "review" ? "What helped?" : "How can we help?"}
        />
      </label>

      <button type="submit" className="btn-primary focus-ring mt-4 disabled:opacity-60" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : type === "review" ? (
          "Submit review"
        ) : (
          "Send"
        )}
      </button>

      {status === "ok" && <p className="mt-3 text-sm text-ok">Sent. Thank you.</p>}
      {status === "err" && error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </form>
  );
}
