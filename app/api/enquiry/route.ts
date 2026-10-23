import { NextResponse } from "next/server";
import { devFallback, esc, field, newRef, sendTelegramMessage } from "@/lib/telegram";

// Patient enquiry → Fidinda's Telegram.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");
  const d = {
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
    language: str(body.language) || "Khmer",
    area: str(body.area) || "Not sure yet",
    destination: str(body.destination) || "No preference",
    message: str(body.message),
    consent: body.consent === "yes",
    documents: Array.isArray(body.documents) ? body.documents.filter((x): x is string => typeof x === "string").slice(0, 10) : [],
  };

  if (!d.name || d.phone.replace(/\D/g, "").length < 8 || !d.consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const ref = newRef("FHS");
  const html = [
    `🩺 <b>New patient enquiry</b> · <code>${ref}</code>`,
    "",
    field("Name", d.name),
    field("Phone / Telegram", d.phone),
    field("Email", d.email),
    field("Preferred language", d.language),
    field("Treatment area", d.area),
    field("Preferred destination", d.destination),
    d.message ? `\n<b>About the condition:</b>\n${esc(d.message)}` : "",
    d.documents.length ? `\n📎 <b>Documents (${d.documents.length}):</b> arriving next\n${d.documents.map((n) => `• ${esc(n)}`).join("\n")}` : "",
    "",
    "✅ Consented to sharing medical documents with selected hospitals for review.",
  ]
    .filter((l, i) => l !== "" || i === 1 || i === 10)
    .join("\n");

  if (devFallback()) {
    console.log(`\n[Telegram not set up — printing instead]\n${html.replace(/<[^>]+>/g, "")}\n`);
    return NextResponse.json({ ok: true, ref });
  }

  const sent = await sendTelegramMessage(html);
  if (!sent.ok) {
    console.error("Telegram send failed:", sent.error);
    return NextResponse.json({ ok: false, error: "Could not deliver enquiry" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ref });
}
