import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  type: z.literal("contact"),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(4000),
  rating: z.number().int().min(1).max(5).optional(),
});

const reviewSchema = z.object({
  type: z.literal("review"),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(4000),
});

const schema = z.union([contactSchema, reviewSchema]);

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill all fields correctly." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || "PhishGuard <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Add a valid RESEND_API_KEY and CONTACT_TO_EMAIL to your environment before sending messages.",
      },
      { status: 503 },
    );
  }

  const { name, email, message, type } = parsed.data;
  const rating = parsed.data.type === "review" ? parsed.data.rating : undefined;
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
  } catch (error) {
    console.error("Resend email failed", error);
    return NextResponse.json({ error: "Could not send your message. Please check your email settings and try again." }, { status: 500 });
  }
}
