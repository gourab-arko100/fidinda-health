import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import { PageHero } from "@/components/Blocks";
import { COMPANY, tel } from "@/lib/content";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        kicker="Contact us"
        title="Tell us about the case"
        lede="Share a few details and a coordinator will contact you in Khmer or English."
      />
      <section className="band" id="enquiry">
        <div className="wrap contact-grid">
          <div className="panel">
            <ContactForm />
          </div>
          <div className="panel info">
            <div>
              <span className="k">Call us</span>
              <span className="v">
                <span className="lang">KH</span>
                <a href={tel(COMPANY.phoneKhmer)}>{COMPANY.phoneKhmer}</a>
                <CopyButton text={COMPANY.phoneKhmer} />
              </span>
              <span className="v" style={{ marginTop: 6 }}>
                <span className="lang">EN</span>
                <a href={tel(COMPANY.phoneEnglish)}>{COMPANY.phoneEnglish}</a>
                <CopyButton text={COMPANY.phoneEnglish} />
              </span>
            </div>
            <div><span className="k">Website</span><span className="v">{COMPANY.website}</span></div>
            <div><span className="k">Company</span><span className="v">{COMPANY.parent}</span></div>
            <div><span className="k">Registered in</span><span className="v">{COMPANY.registeredIn} · No. {COMPANY.registrationNo}</span></div>
            <p className="note">We are a facilitation service, not a hospital. Medical decisions are made only by qualified doctors and hospitals.</p>
          </div>
        </div>
      </section>
    </>
  );
}
