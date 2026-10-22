import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, Rule } from "@/components/Blocks";
import { PARTNERS, WHO_WE_SERVE } from "@/lib/content";

export const metadata: Metadata = { title: "Who we serve" };

export default function WhoWeServePage() {
  return (
    <>
      <PageHero
        crumb="Who we serve"
        kicker="Who we serve"
        title="Patients, families and partners"
        lede="We work with patients and families across Cambodia, and with hospitals and service providers who share our standards."
      />
      <section className="band">
        <div className="wrap lists">
          <div>
            <span className="kicker">Patients &amp; families</span>
            <h2>Who we serve</h2>
            <Rule />
            <ul>{WHO_WE_SERVE.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div id="partners">
            <span className="kicker">Collaboration</span>
            <h2>Partnership opportunities</h2>
            <Rule />
            <p style={{ marginBottom: 12 }}>We welcome collaboration with:</p>
            <ul>{PARTNERS.map((x) => <li key={x}>{x}</li>)}</ul>
            <Link className="btn btn-navy mt" href="/contact#enquiry">Become a partner</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
