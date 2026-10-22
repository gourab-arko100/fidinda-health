import Link from "next/link";
import { COMPANY, STEPS } from "@/lib/content";

export function PageHero({ crumb, kicker, title, lede }: { crumb: string; kicker: string; title: string; lede: string }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </div>
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        <p className="lede">{lede}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="band navy tight">
      <div className="wrap cta">
        <div>
          <span className="kicker">Start with your reports</span>
          <h2>Tell us about the case. We&apos;ll help you plan the next step.</h2>
          <p className="lede">
            Call us in Khmer on {COMPANY.phoneKhmer} or in English on {COMPANY.phoneEnglish}, or send an enquiry online.
          </p>
        </div>
        <div className="btns">
          <Link className="btn btn-red" href="/contact#enquiry">Send an enquiry</Link>
          <Link className="btn btn-ghost" href="/how-it-works">How it works</Link>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <div className="process">
      {STEPS.map((s, i) => (
        <div className="chev" key={s.title}>
          <div className="arrow" aria-hidden="true">{i + 1}</div>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoleNote() {
  return (
    <div className="role">
      <h3>Our role</h3>
      <p>
        {COMPANY.name} is a patient support and medical travel facilitation service. We are not a hospital, clinic or
        medical treatment provider. All diagnoses, medical opinions, treatment plans and costs are provided by the selected
        doctors and hospitals. The patient and family make the final decision after reviewing the available information.
      </p>
    </div>
  );
}

export function Rule({ aqua = false }: { aqua?: boolean }) {
  return <span className={`rule${aqua ? " aqua" : ""}`} />;
}
