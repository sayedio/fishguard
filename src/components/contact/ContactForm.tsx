"use client";

import { FormEvent, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

async function submitForm(payload: {
  type: "contact" | "review";
  name: string;
  email: string;
  message: string;
  rating?: number;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as { error?: string } | null;

  if (!res.ok) {
    throw new Error(data?.error || "Failed to send your message.");
  }

  return data;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setError(null);

    try {
      await submitForm({ type: "contact", name, email, message });
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("err");
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel p-5 sm:p-6">
      <div className="mb-5">
        <span className="eyebrow">Contact</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
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

      <label className="mt-4 block text-sm font-medium text-fg">
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-[0.35rem] border border-line bg-bg px-3 py-2 text-sm outline-none"
          placeholder="How can we help?"
        />
      </label>

      <button type="submit" className="btn-primary focus-ring mt-4 disabled:opacity-60" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send"
        )}
      </button>

      {status === "ok" && <p className="mt-3 text-sm text-ok">Your message was sent.</p>}
      {status === "err" && error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </form>
  );
}

export function ReviewForm() {
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
      await submitForm({ type: "review", name, email, message, rating });

      try {
        const key = "phishguard_reviews";
        const prev = JSON.parse(localStorage.getItem(key) || "[]") as Array<{
          id: string;
          name: string;
          rating: number;
          text: string;
          role?: string;
        }>;
        prev.unshift({ id: `local-${Date.now()}`, name, role: "Community", rating, text: message });
        localStorage.setItem(key, JSON.stringify(prev.slice(0, 20)));
      } catch {
        /* ignore local storage issues */
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
      <div className="mb-5">
        <span className="eyebrow">Review</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
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

      <label className="mt-4 block text-sm font-medium text-fg">
        Review
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-[0.35rem] border border-line bg-bg px-3 py-2 text-sm outline-none"
          placeholder="What helped you most?"
        />
      </label>

      <button type="submit" className="btn-primary focus-ring mt-4 disabled:opacity-60" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          "Submit review"
        )}
      </button>

      {status === "ok" && <p className="mt-3 text-sm text-ok">Thanks for the review.</p>}
      {status === "err" && error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </form>
  );
}
