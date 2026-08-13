import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(10).max(4000),
  type: z.enum(["contact", "review"]).default("contact"),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill all fields correctly." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "PhishGuard <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL to .env.local.",
      },
      { status: 503 },
    );
  }

  const { name, email, rating, message, type } = parsed.data;
  const resend = new Resend(apiKey);

  const subject =
    type === "review"
      ? `PhishGuard review${rating ? ` (${rating}/5)` : ""} from ${name}`
      : `PhishGuard contact from ${name}`;

  try {
    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      text: [
        `Type: ${type}`,
        `Name: ${name}`,
        `Email: ${email}`,
        rating ? `Rating: ${rating}/5` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send your message. Try again later." }, { status: 500 });
  }
}
