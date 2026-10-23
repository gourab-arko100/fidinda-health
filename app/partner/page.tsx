import type { Metadata } from "next";
import CopyButton from "@/components/CopyButton";
import PartnerForm from "@/components/PartnerForm";
import { PageHero } from "@/components/Blocks";
import { COMPANY, TELEGRAM_DISPLAY, TELEGRAM_LINK, tel } from "@/lib/content";

export const metadata: Metadata = { title: "Partner with us" };

const STEPS = [
  ["Send your enquiry", "Tell us about your organisation and the collaboration you have in mind."],
  ["Introductory call", "Our team contacts you to understand your services and how you work with international patients."],
  ["Agree how we work", "We agree the scope, communication process and documents needed."],
  ["Start working together", "We begin coordinating with you for Cambodian patients whose needs match your services."],
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        crumb="Partner with us"
        kicker="Partnership opportunities"
        title="Partner with Fidinda Health Solutions"
        lede="We work with hospitals, clinics, diagnostic centres, insurers, travel and accommodation providers to support Cambodian patients seeking care abroad."
      />
      <section className="band" id="partner-form">
        <div className="wrap contact-grid">
          <div className="panel">
            <PartnerForm />
          </div>
          <div className="partner-side">
            <div className="panel">
              <h3 className="side-h">What happens next</h3>
              <ol className="next-steps">
                {STEPS.map(([t, d], i) => (
                  <li key={t}>
                    <span className="num">{i + 1}</span>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="panel info">
              <div>
                <span className="k">Talk to our team</span>
                <span className="v">
                  <span className="lang">EN</span>
                  <a href={tel(COMPANY.phoneEnglish)}>{COMPANY.phoneEnglish}</a>
                  <CopyButton text={COMPANY.phoneEnglish} />
                </span>
                <span className="v" style={{ marginTop: 6 }}>
                  <span className="lang">KH</span>
                  <a href={tel(COMPANY.phoneKhmer)}>{COMPANY.phoneKhmer}</a>
                  <CopyButton text={COMPANY.phoneKhmer} />
                </span>
              </div>
              <div><span className="k">Company</span><span className="v">{COMPANY.parent}</span></div>
              <div><span className="k">Registration</span><span className="v">No. {COMPANY.registrationNo} · VAT TIN {COMPANY.vatTin}</span></div>
              <div><span className="k">Telegram</span><span className="v"><a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">{TELEGRAM_DISPLAY}</a><CopyButton text={TELEGRAM_DISPLAY} /></span></div>
              <div><span className="k">Email</span><span className="v"><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><CopyButton text={COMPANY.email} /></span></div>
              <div><span className="k">Website</span><span className="v">{COMPANY.website}</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
