import { NextResponse } from "next/server";

// Receives enquiries from the contact form.
// Right now it validates the data and prints it in the terminal running `npm run dev`.
// To get enquiries by email, connect a mail service here (see README).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");
  const enquiry = {
    name: str(body.name),
    phone: str(body.phone),
    email: str(body.email),
    language: str(body.language),
    area: str(body.area),
    destination: str(body.destination),
    message: str(body.message),
    consent: body.consent === "yes",
    documents: Array.isArray(body.documents) ? body.documents.filter((d): d is string => typeof d === "string").slice(0, 10) : [],
    receivedAt: new Date().toISOString(),
  };

  if (!enquiry.name || enquiry.phone.replace(/\D/g, "").length < 8 || !enquiry.consent) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  console.log("New patient enquiry:", enquiry);
  return NextResponse.json({ ok: true });
}
