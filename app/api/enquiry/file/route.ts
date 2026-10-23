import { NextResponse } from "next/server";
import { devFallback, esc, sendTelegramDocument } from "@/lib/telegram";

// One medical document → Fidinda's Telegram, attached to its enquiry by reference.
// Files are passed straight through to Telegram and never saved on the website.
// Vercel limits each request to about 4.5 MB, so the form sends files one at a time, 4 MB max each.
const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = /\.(pdf|jpe?g|png|heic|docx?)$/i;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload" }, { status: 400 });
  }

  const file = form.get("file");
  const ref = String(form.get("ref") || "").slice(0, 20);
  const patient = String(form.get("name") || "").slice(0, 120);

  if (!(file instanceof Blob) || !/^FHS-[A-Z0-9]{5}$/.test(ref)) {
    return NextResponse.json({ ok: false, error: "Missing file or reference" }, { status: 400 });
  }
  const filename = (file as File).name || "document";
  if (!ALLOWED.test(filename)) return NextResponse.json({ ok: false, error: "File type not allowed" }, { status: 415 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "File too large" }, { status: 413 });

  const caption = `📎 Document for enquiry <code>${ref}</code>${patient ? ` · ${esc(patient)}` : ""}`;

  if (devFallback()) {
    console.log(`[Telegram not set up] document for ${ref}: ${filename} (${Math.round(file.size / 1024)} KB)`);
    return NextResponse.json({ ok: true });
  }

  const sent = await sendTelegramDocument(file, filename, caption);
  if (!sent.ok) {
    console.error("Telegram document failed:", sent.error);
    return NextResponse.json({ ok: false, error: "Could not deliver file" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
