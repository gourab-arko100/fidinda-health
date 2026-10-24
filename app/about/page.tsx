import type { Metadata } from "next";
import { CtaBand, PageHero, RoleNote, Rule } from "@/components/Blocks";
import { COMPANY, FIDINDA_GROUP, VALUES } from "@/lib/content";

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
      <section className="band" id="group">
        <div className="wrap split eco">
          <div>
            <span className="kicker lined">Our position within Fidinda Solutions</span>
            <h2>Part of a wider service group</h2>
            <Rule />
            <p className="lede">
              Fidinda Health Solutions works alongside Fidinda Financial Solutions, Fidinda Management Solutions and Fidinda
              Travel Solutions. Being part of one group lets us coordinate smoothly when a family needs more than one kind of
              support, while each division stays focused on its own specialist service.
            </p>
            <p className="lede">
              Medical travel facilitation is handled by our health team. Travel, financial and management services are handled by
              their own teams, so every part of your journey is looked after by the right people.
            </p>
          </div>
          <div className="eco-card" aria-label="Fidinda Solutions group structure">
            <div className="eco-parent">{FIDINDA_GROUP.parent}</div>
            <ul className="eco-tree">
              {FIDINDA_GROUP.divisions.map((d) => (
                <li key={d} className={d === FIDINDA_GROUP.current ? "here" : undefined} aria-current={d === FIDINDA_GROUP.current ? "true" : undefined}>
                  <span>{d}</span>
                  {d === FIDINDA_GROUP.current && <span className="here-tag">You are here</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
