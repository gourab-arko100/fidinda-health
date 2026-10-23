"use client";

import { FormEvent, useRef, useState } from "react";
import Flag from "./Flag";
import { AREAS, COMPANY, DESTINATIONS, TELEGRAM_DISPLAY, TELEGRAM_LINK } from "@/lib/content";

type Errors = Partial<Record<"name" | "phone" | "email" | "consent" | "files", string>>;

// Documents: optional, up to 5 files of 4 MB each (each one is sent to Telegram separately)
const MAX_FILES = 5;
const MAX_MB = 4;
const ACCEPT = ".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx";
const ACCEPT_RE = /\.(pdf|jpe?g|png|heic|docx?)$/i;
const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

type FileState = "waiting" | "sending" | "sent" | "failed";

const TgIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15z" /><path d="M9 13l9-6-7 8" />
  </svg>
);

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [failed, setFailed] = useState(false);
  const [ref, setRef] = useState("");
  const [sentFiles, setSentFiles] = useState<File[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
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
    else if (big) msg = `${big.name} is larger than ${MAX_MB} MB. Send it to us on Telegram after your enquiry.`;
    else if (merged.length > MAX_FILES) msg = `You can add up to ${MAX_FILES} files here. Send any others to us on Telegram.`;
    setFiles(merged.slice(0, MAX_FILES));
    setErrors((e) => ({ ...e, files: msg }));
    if (fileInput.current) fileInput.current.value = "";
  }

  function removeFile(i: number) {
    setFiles((f) => f.filter((_, j) => j !== i));
    setErrors((e) => ({ ...e, files: "" }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    delete (data as Record<string, unknown>).documents;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter the patient's name.";
    if ((data.phone || "").replace(/\D/g, "").length < 8) next.phone = "Enter a phone number we can call, with country code.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = "Check the email address, or leave it empty.";
    if (!data.consent) next.consent = "Tick this box so we can share your records with hospitals.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setFailed(false);
    setPhase("sending");
    const docs = files;
    setSentFiles(docs);
    setFileStates(docs.map(() => "waiting"));

    // 1. The enquiry itself
    let reference = "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, documents: docs.map((f) => f.name) }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error();
      reference = out.ref;
      setRef(reference);
    } catch {
      setFailed(true);
      setPhase("form");
      return;
    }

    // 2. Each document, one at a time
    for (let i = 0; i < docs.length; i++) {
      setFileStates((s) => s.map((v, j) => (j === i ? "sending" : v)));
      const body = new FormData();
      body.append("ref", reference);
      body.append("name", data.name.trim());
      body.append("file", docs[i], docs[i].name);
      let ok = false;
      try {
        const res = await fetch("/api/enquiry/file", { method: "POST", body });
        ok = res.ok;
      } catch {
        ok = false;
      }
      setFileStates((s) => s.map((v, j) => (j === i ? (ok ? "sent" : "failed") : v)));
    }

    form.reset();
    setFiles([]);
    setPhase("done");
  }

  if (phase !== "form") {
    const sending = phase === "sending";
    const anyFailed = fileStates.includes("failed");
    return (
      <div className="done">
        <span className={`tg-done-ic${sending ? " busy" : ""}`} aria-hidden="true"><TgIcon size={30} /></span>
        <b>{sending ? "Sending your enquiry…" : "Thank you. We received your enquiry."}</b>
        <p className="lede" style={{ margin: "0 auto" }}>
          {sending
            ? "Please keep this page open until everything is sent."
            : "A coordinator will contact you soon on the phone or Telegram number you gave us."}
        </p>
        {ref && !sending && <p className="ref-chip">Your reference: <code>{ref}</code></p>}

        {sentFiles.length > 0 && (
          <div className="doc-step">
            <span className="doc-step-n">Documents</span>
            <ul className="file-list">
              {sentFiles.map((f, i) => (
                <li key={f.name + f.size}>
                  <span className="file-ext">{f.name.split(".").pop()}</span>
                  <span className="file-name">{f.name}</span>
                  <span className={`file-state ${fileStates[i]}`}>
                    {fileStates[i] === "sent" ? "Sent" : fileStates[i] === "failed" ? "Not sent" : fileStates[i] === "sending" ? "Sending…" : "Waiting"}
                  </span>
                </li>
              ))}
            </ul>
            {!sending && anyFailed && (
              <p className="err">
                Some files didn&apos;t send. Please send them to us on Telegram ({TELEGRAM_DISPLAY}) and mention your reference {ref}.
              </p>
            )}
          </div>
        )}

        {!sending && (
          <div className="btns" style={{ justifyContent: "center", marginTop: 20 }}>
            <a className="btn btn-tg" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer"><TgIcon size={18} />Chat with us on Telegram</a>
            <button className="btn btn-ghost" type="button" onClick={() => { setPhase("form"); setRef(""); setSentFiles([]); }}>New enquiry</button>
          </div>
        )}
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
          <p className="form-hint">Files are sent securely to our care team with your enquiry. They are not stored on this website.</p>
        </div>
        <label className="check" htmlFor="consent">
          <input type="checkbox" id="consent" name="consent" value="yes" />
          I agree that {COMPANY.name} may share my medical documents with selected hospitals for review.
        </label>
        <div className="err">{errors.consent}</div>
        {failed && (
          <p className="form-fail">
            We couldn&apos;t send your enquiry. Please try again, or message us on Telegram ({TELEGRAM_DISPLAY}) or call {COMPANY.phoneEnglish}.
          </p>
        )}
        <button className="btn btn-red" type="submit">
          <TgIcon />
          Send enquiry
        </button>
        <p className="form-hint">Your enquiry goes straight to our care team on Telegram.</p>
      </form>
    </>
  );
}
