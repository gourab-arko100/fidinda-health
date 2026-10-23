import { NextResponse } from "next/server";
import { devFallback, esc, field, newRef, sendTelegramMessage } from "@/lib/telegram";

// Partnership enquiry → Fidinda's Telegram.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");
  const d = {
    organisation: str(body.organisation),
    type: str(body.type) === "Other" ? str(body.typeOther) || "Other" : str(body.type),
    contact: str(body.contact),
    role: str(body.role),
    location: str(body.location),
    phone: str(body.phone),
    email: str(body.email),
    website: str(body.website),
    message: str(body.message),
    agreed: body.agree === "yes",
  };

  if (!d.organisation || !d.contact || !d.type || d.phone.replace(/\D/g, "").length < 8 || !d.email || !d.agreed) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const ref = newRef("FHP");
  const html = [
    `🤝 <b>New partnership enquiry</b> · <code>${ref}</code>`,
    "",
    field("Organisation", d.organisation),
    field("Type", d.type),
    field("Contact person", d.contact),
    field("Role", d.role),
    field("Country / city", d.location),
    field("Phone / WhatsApp", d.phone),
    field("Email", d.email),
    field("Website", d.website),
    d.message ? `\n<b>How they would like to work together:</b>\n${esc(d.message)}` : "",
  ]
    .filter((l, i) => l !== "" || i === 1)
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
