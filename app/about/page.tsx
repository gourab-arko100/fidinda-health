import type { Metadata } from "next";
import { CtaBand, PageHero, RoleNote, Rule } from "@/components/Blocks";
import { COMPANY, VALUES } from "@/lib/content";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        kicker="About us"
        title="A Cambodian partner for care abroad"
        lede="Fidinda Health Solutions is a medical value travel service established to help Cambodian patients and families find the care they need abroad."
      />

      <section className="band">
        <div className="wrap split">
          <div>
            <span className="kicker">Who we are</span>
            <h2>Advanced, affordable and trusted care, with support at every step</h2>
            <Rule />
            <p className="lede">
              Through our service, we make it easier to access advanced, affordable and trusted healthcare, with support
              every step of the way.
            </p>
            <p className="lede">
              We work as a reliable healthcare facilitation partner for patients seeking specialised treatment, second
              opinions, advanced diagnostics, surgery, rehabilitation, preventive health check-ups and long-term treatment
              planning outside Cambodia.
            </p>
          </div>
          <div className="reg">
            <h3>Company details</h3>
            <div><span>Parent company</span><b>{COMPANY.parent}</b></div>
            <div><span>Registered with</span><b>{COMPANY.registeredWith}</b></div>
            <div><span>Registration number</span><b>{COMPANY.registrationNo}</b></div>
            <div><span>VAT TIN</span><b>{COMPANY.vatTin}</b></div>
            <div><span>Website</span><b>{COMPANY.website}</b></div>
          </div>
        </div>
      </section>

      <section className="band sunk">
        <div className="wrap">
          <span className="kicker">Direction</span>
          <h2>Vision &amp; Mission</h2>
          <Rule aqua />
          <div className="vm mt">
            <div className="vision">
              <span className="lbl">VISION</span>
              <p>
                To become Cambodia&apos;s trusted partner for medical value tourism by connecting patients with quality
                healthcare options abroad through care, transparency and professional guidance.
              </p>
            </div>
            <div className="mission">
              <span className="lbl">MISSION</span>
              <p>
                To help Cambodian patients and their families access suitable international hospitals, specialist doctors
                and treatment options through ethical facilitation, transparent communication, personalised support and
                end-to-end coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band" id="values">
        <div className="wrap">
          <span className="kicker">What guides us</span>
          <h2>Our core values</h2>
          <Rule />
          <div className="values mt">
            {VALUES.map((v) => (
              <div className={`value${v.solid ? " solid" : ""}`} key={v.title}>
                <div className="dia" />
                <h3>{v.title}</h3>
                <i />
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band sunk tight" id="role">
        <div className="wrap">
          <RoleNote />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
