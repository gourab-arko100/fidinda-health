"use client";

import { FormEvent, useState } from "react";
import { COMPANY, PARTNERS, TELEGRAM_DISPLAY, TELEGRAM_LINK } from "@/lib/content";

type Errors = Partial<Record<"organisation" | "contact" | "type" | "phone" | "email" | "agree", string>>;

const TgIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15z" /><path d="M9 13l9-6-7 8" />
  </svg>
);

export default function PartnerForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState("");
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [failed, setFailed] = useState(false);
  const [ref, setRef] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.organisation?.trim()) next.organisation = "Enter your organisation's name.";
    if (!data.contact?.trim()) next.contact = "Enter the name of the person we should contact.";
    if (!data.type) next.type = "Choose the type of organisation.";
    else if (data.type === "Other" && !data.typeOther?.trim()) next.type = "Tell us what type of organisation you are.";
    if ((data.phone || "").replace(/\D/g, "").length < 8) next.phone = "Enter a phone or WhatsApp number with country code.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email || "").trim())) next.email = "Enter a work email like name@company.com.";
    if (!data.agree) next.agree = "Tick this box so our team can contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setFailed(false);
    setPhase("sending");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error();
      setRef(out.ref);
      form.reset();
      setType("");
      setPhase("done");
    } catch {
      setFailed(true);
      setPhase("form");
    }
  }

  if (phase !== "form") {
    const sending = phase === "sending";
    return (
      <div className="done">
        <span className={`tg-done-ic${sending ? " busy" : ""}`} aria-hidden="true"><TgIcon size={30} /></span>
        <b>{sending ? "Sending your enquiry…" : "Thank you. We received your partnership enquiry."}</b>
        <p className="lede" style={{ margin: "0 auto" }}>
          {sending ? "This takes a moment." : "A member of our team will contact you to discuss how we can work together."}
        </p>
        {ref && !sending && <p className="ref-chip">Your reference: <code>{ref}</code></p>}
        {!sending && (
          <div className="btns" style={{ justifyContent: "center", marginTop: 20 }}>
            <a className="btn btn-tg" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"><TgIcon size={18} />Chat with us on Telegram</a>
            <button className="btn btn-ghost" type="button" onClick={() => { setPhase("form"); setRef(""); }}>New enquiry</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <h2>Partnership enquiry</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="fld">
            <label htmlFor="p-org">Organisation name</label>
            <input id="p-org" name="organisation" autoComplete="organization" />
            <div className="err">{errors.organisation}</div>
          </div>
          <div className="fld">
            <label htmlFor="p-web">Website <span className="opt">(optional)</span></label>
            <input id="p-web" name="website" type="url" inputMode="url" placeholder="https://" />
            <div className="err" />
          </div>
        </div>

        <fieldset className="fld" style={{ border: "none", padding: 0, margin: 0 }}>
          <legend className="fld-label">Type of organisation</legend>
          <div className="type-chips">
            {[...PARTNERS, "Other"].map((p) => (
              <label key={p} className={type === p ? "on" : ""}>
                <input type="radio" name="type" value={p} checked={type === p} onChange={() => setType(p)} />
                {p}
              </label>
            ))}
          </div>
          {type === "Other" && (
            <input className="type-other" name="typeOther" placeholder="What type of organisation are you?" aria-label="Type of organisation" />
          )}
          <div className="err">{errors.type}</div>
        </fieldset>

        <div className="row">
          <div className="fld">
            <label htmlFor="p-contact">Contact person</label>
            <input id="p-contact" name="contact" autoComplete="name" />
            <div className="err">{errors.contact}</div>
          </div>
          <div className="fld">
            <label htmlFor="p-role">Role or position <span className="opt">(optional)</span></label>
            <input id="p-role" name="role" autoComplete="organization-title" placeholder="e.g. International Patient Manager" />
            <div className="err" />
          </div>
        </div>
        <div className="row">
          <div className="fld">
            <label htmlFor="p-phone">Phone or WhatsApp</label>
            <input id="p-phone" name="phone" type="tel" autoComplete="tel" placeholder="With country code" />
            <div className="err">{errors.phone}</div>
          </div>
          <div className="fld">
            <label htmlFor="p-email">Work email</label>
            <input id="p-email" name="email" type="email" autoComplete="email" />
            <div className="err">{errors.email}</div>
          </div>
        </div>
        <div className="fld">
          <label htmlFor="p-loc">Country and city</label>
          <input id="p-loc" name="location" placeholder="e.g. Chennai, India" />
        </div>
        <div className="fld">
          <label htmlFor="p-msg">How would you like to work with us?</label>
          <textarea id="p-msg" name="message" rows={5} placeholder="Your services, specialties or facilities, and the kind of collaboration you have in mind" />
        </div>
        <label className="check" htmlFor="p-agree">
          <input type="checkbox" id="p-agree" name="agree" value="yes" />
          I agree that {COMPANY.name} may contact me about this partnership enquiry.
        </label>
        <div className="err">{errors.agree}</div>
        {failed && (
          <p className="form-fail">
            We couldn&apos;t send your enquiry. Please try again, or message us on Telegram ({TELEGRAM_DISPLAY}) or email {COMPANY.email}.
          </p>
        )}
        <button className="btn btn-red" type="submit">
          <TgIcon />
          Send partnership enquiry
        </button>
        <p className="form-hint">Your enquiry goes straight to our team on Telegram.</p>
      </form>
    </>
  );
}
