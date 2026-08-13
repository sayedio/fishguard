import { NextResponse } from "next/server";
import { BERT_API_URL, SVM_API_URL } from "@/lib/constants";
import { explainEmail } from "@/lib/explain";
import { normalizePrediction } from "@/lib/scoring";

async function proxyPredict(baseUrl: string, text: string, which: "fast" | "deep") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail || data.error || `Upstream error (${res.status})` },
        { status: 502 },
      );
    }
    const scored = normalizePrediction(data, text, which);
    const why = explainEmail(text, scored);
    return NextResponse.json({ ...scored, ...why });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request, which: "fast" | "deep") {
  const body = await request.json().catch(() => null);
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "Email text is required." }, { status: 400 });
  }
  const base = which === "fast" ? SVM_API_URL : BERT_API_URL;
  return proxyPredict(base, text, which);
}

export const predictFast = (req: Request) => POST(req, "fast");
export const predictDeep = (req: Request) => POST(req, "deep");
