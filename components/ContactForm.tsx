"use client";

import { FormEvent, useRef, useState } from "react";
import Flag from "./Flag";
import { AREAS, COMPANY, DESTINATIONS, WHATSAPP } from "@/lib/content";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent" | "files", string>>;

// Documents: optional, up to 5 files of 10 MB each (WhatsApp accepts much larger, but this keeps sharing reliable)
const MAX_FILES = 5;
const MAX_MB = 10;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx";
const ACCEPT_RE = /\.(pdf|jpe?g|png|heic|docx?)$/i;
const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

// Builds the WhatsApp message. *text* shows as bold in WhatsApp.
function buildMessage(d: Record<string, string>, fileNames: string[] = []) {
  const lines = [
    "*New patient enquiry*",
    "",
    `*Name:* ${d.name.trim()}`,
    `*Phone / Telegram:* ${d.phone.trim()}`,
    d.email?.trim() ? `*Email:* ${d.email.trim()}` : "",
    `*Preferred language:* ${d.language || "Khmer"}`,
    `*Treatment area:* ${d.area || "Not sure yet"}`,
    `*Preferred destination:* ${d.destination || "No preference"}`,
    d.message?.trim() ? `\n*About the condition:*\n${d.message.trim()}` : "",
    fileNames.length
      ? `\n*Documents (${fileNames.length}):* I will send these in this chat next:\n${fileNames.map((n) => `- ${n}`).join("\n")}`
      : "",
    "",
    "I agree that Fidinda Health Solutions may share my medical documents with selected hospitals for review.",
  ];
  return lines.filter((l, i) => l !== "" || i === 1 || i === lines.length - 2).join("\n");
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [waLink, setWaLink] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [sentFiles, setSentFiles] = useState<File[]>([]);
  const [canShareFiles, setCanShareFiles] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "shared" | "failed">("idle");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const bad = incoming.find((f) => !ACCEPT_RE.test(f.name));
    const big = incoming.find((f) => f.size > MAX_MB * 1048576);
    const merged = [...files, ...incoming.filter((f) => ACCEPT_RE.test(f.name) && f.size <= MAX_MB * 1048576)]
      .filter((f, i, arr) => arr.findIndex((g) => g.name === f.name && g.size === f.size) === i);
    let msg = "";
    if (bad) msg = `${bad.name} can't be added. Use PDF, JPG, PNG, HEIC or Word files.`;
    else if (big) msg = `${big.name} is larger than ${MAX_MB} MB. Send it in WhatsApp directly after your enquiry.`;
    else if (merged.length > MAX_FILES) msg = `You can add up to ${MAX_FILES} files here. Send any others in the WhatsApp chat.`;
    setFiles(merged.slice(0, MAX_FILES));
    setErrors((e) => ({ ...e, files: msg }));
    if (fileInput.current) fileInput.current.value = "";
  }

  function removeFile(i: number) {
    setFiles((f) => f.filter((_, j) => j !== i));
    setErrors((e) => ({ ...e, files: "" }));
  }

  async function shareDocuments() {
    try {
      await navigator.share({ files: sentFiles, title: "Medical documents", text: "Medical documents for my Fidinda enquiry" });
      setShareState("shared");
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") setShareState("failed");
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter the patient's name.";
    if ((data.phone || "").replace(/\D/g, "").length < 8) next.phone = "Enter a phone number we can call, with country code.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = "Check the email address, or leave it empty.";
    if (!data.consent) next.consent = "Tick this box so we can share your records with hospitals.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const fileNames = files.map((f) => f.name);
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(data, fileNames))}`;

    // Backup copy on the server, so an enquiry is not lost if the patient never taps Send in WhatsApp.
    // keepalive lets the request finish even while the browser switches to WhatsApp.
    fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, documents: fileNames }),
      keepalive: true,
    }).catch(() => {});

    // Open WhatsApp straight away (inside the click, so pop-up blockers allow it).
    window.open(link, "_blank", "noopener");
    form.reset();
    setSentFiles(files);
    setCanShareFiles(files.length > 0 && typeof navigator !== "undefined" && !!navigator.canShare?.({ files }));
    setShareState("idle");
    setFiles([]);
    setWaLink(link);
  }

  if (waLink) {
    return (
      <div className="done">
        <span className="wa-done-ic" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
            <path d="M9 8.5c0 3 2.5 5.8 5.5 6.5l1.2-1.4-1.9-1-1 .8a5 5 0 0 1-2.2-2.2l.8-1-1-1.9z" />
          </svg>
        </span>
        <b>One last step: tap Send in WhatsApp</b>
        <p className="lede" style={{ margin: "0 auto" }}>
          We opened WhatsApp with your enquiry already written. Press <strong>Send</strong> there and a coordinator will reply in the same chat.
        </p>
        <div className="btns" style={{ justifyContent: "center", marginTop: 20 }}>
          <a className="btn btn-wa" href={waLink} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
          <button className="btn btn-ghost" type="button" onClick={() => setWaLink(null)}>New enquiry</button>
        </div>

        {sentFiles.length > 0 && (
          <div className="doc-step">
            <span className="doc-step-n">Step 2</span>
            <h3>Send your {sentFiles.length === 1 ? "document" : `${sentFiles.length} documents`}</h3>
            <ul className="file-list">
              {sentFiles.map((f) => (
                <li key={f.name + f.size}><span className="file-ext">{f.name.split(".").pop()}</span><span className="file-name">{f.name}</span><span className="file-size">{fmtSize(f.size)}</span></li>
              ))}
            </ul>
            {canShareFiles ? (
              <>
                <button className="btn btn-wa" type="button" onClick={shareDocuments}>
                  {shareState === "shared" ? "Shared. Send again?" : "Send my documents"}
                </button>
                <p className="form-hint">Choose <b>WhatsApp</b>, then the <b>Fidinda Health Solutions</b> chat (it will be at the top).</p>
              </>
            ) : (
              <ol className="attach-steps">
                <li>In the WhatsApp chat with Fidinda, click the <b>📎 attach</b> (or <b>+</b>) button.</li>
                <li>Choose <b>Document</b> (or <b>Photos</b> for pictures).</li>
                <li>Select the files listed above and press <b>Send</b>.</li>
              </ol>
            )}
            {shareState === "failed" && (
              <p className="err">Your phone couldn&apos;t share the files. Attach them in the WhatsApp chat with the 📎 button instead.</p>
            )}
          </div>
        )}
        <p className="note" style={{ marginTop: 20, textAlign: "left" }}>
          No WhatsApp? Call us on {COMPANY.phoneKhmer} (Khmer) or {COMPANY.phoneEnglish} (English).
        </p>
      </div>
    );
  }

  return (
    <>
      <h2>Patient enquiry</h2>
      <form onSubmit={onSubmit} noValidate>
        <div className="row">
          <div className="fld">
            <label htmlFor="name">Patient name</label>
            <input id="name" name="name" autoComplete="name" />
            <div className="err">{errors.name}</div>
          </div>
          <div className="fld">
            <label htmlFor="phone">Phone or Telegram number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+855" />
            <div className="err">{errors.phone}</div>
          </div>
        </div>
        <div className="row">
          <div className="fld">
            <label htmlFor="email">Email (optional)</label>
            <input id="email" name="email" type="email" autoComplete="email" />
            <div className="err">{errors.email}</div>
          </div>
          <div className="fld">
            <span style={{ display: "block", fontSize: ".85rem", fontWeight: 600, marginBottom: 5 }}>Preferred language</span>
            <div className="seg">
              <label><input type="radio" name="language" value="Khmer" defaultChecked /> Khmer</label>
              <label><input type="radio" name="language" value="English" /> English</label>
            </div>
          </div>
        </div>
        <div>
          <div className="fld">
            <label htmlFor="area">Treatment area</label>
            <select id="area" name="area" defaultValue="Not sure yet">
              <option>Not sure yet</option>
              {AREAS.map((a) => <option key={a.title}>{a.title}</option>)}
            </select>
          </div>
        </div>
        <fieldset className="fld" style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ fontSize: ".85rem", fontWeight: 600, marginBottom: 6, padding: 0 }}>Preferred destination</legend>
          <div className="dest-chips">
            <label className="any"><input type="radio" name="destination" value="No preference" defaultChecked /> No preference</label>
            {DESTINATIONS.map((d) => (
              <label key={d.code}>
                <input type="radio" name="destination" value={d.name} />
                <Flag code={d.code} width={24} />
                {d.name}
              </label>
            ))}
            <label className="any"><input type="radio" name="destination" value="Other" /> Other</label>
          </div>
        </fieldset>
        <div className="fld">
          <label htmlFor="message">About the condition</label>
          <textarea id="message" name="message" rows={4} placeholder="Diagnosis so far, treatment suggested, and what you'd like help with" />
        </div>
        <div className="fld">
          <span className="fld-label">Medical documents <span className="opt">(optional)</span></span>
          <div
            className={`upload${dragging ? " over" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <span className="upload-ic" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
              </svg>
            </span>
            <div>
              <b>Add reports, scans or prescriptions</b>
              <p>Drag files here or{" "}
                <button type="button" className="linklike" onClick={() => fileInput.current?.click()}>choose files</button>.
                PDF, JPG, PNG, HEIC or Word · up to {MAX_FILES} files, {MAX_MB} MB each.</p>
            </div>
            <input ref={fileInput} id="documents" type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
          </div>
          {files.length > 0 && (
            <ul className="file-list">
              {files.map((f, i) => (
                <li key={f.name + f.size}>
                  <span className="file-ext">{f.name.split(".").pop()}</span>
                  <span className="file-name">{f.name}</span>
                  <span className="file-size">{fmtSize(f.size)}</span>
                  <button type="button" className="file-x" onClick={() => removeFile(i)} aria-label={`Remove ${f.name}`}>×</button>
                </li>
              ))}
            </ul>
          )}
          <div className="err">{errors.files}</div>
          <p className="form-hint">Your files stay on your device. After WhatsApp opens, you&apos;ll send them in the same chat.</p>
        </div>
        <label className="check" htmlFor="consent">
          <input type="checkbox" id="consent" name="consent" value="yes" />
          I agree that {COMPANY.name} may share my medical documents with selected hospitals for review.
        </label>
        <div className="err">{errors.consent}</div>
        <button className="btn btn-wa" type="submit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
            <path d="M9 8.5c0 3 2.5 5.8 5.5 6.5l1.2-1.4-1.9-1-1 .8a5 5 0 0 1-2.2-2.2l.8-1-1-1.9z" />
          </svg>
          Send enquiry on WhatsApp
        </button>
        <p className="form-hint">WhatsApp opens with your details filled in. Just press Send.</p>
      </form>
    </>
  );
}
