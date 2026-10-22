import type { Metadata } from "next";
import Flag from "@/components/Flag";
import RouteBoard from "@/components/RouteBoard";
import { CtaBand, PageHero, Rule } from "@/components/Blocks";
import { DESTINATIONS } from "@/lib/content";

export const metadata: Metadata = { title: "Destinations" };

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        crumb="Destinations"
        kicker="Destination focus"
        title="Healthcare destinations for Cambodian patients"
        lede="We guide patients to trusted international hospitals in seven focus destinations, and further afield when the case needs it."
      />
      <section className="band">
        <div className="wrap split" style={{ alignItems: "center" }}>
          <div>
            <span className="kicker">Patient choice</span>
            <h2>Trusted destinations, international hospitals, global access</h2>
            <Rule />
            <p className="lede">
              The right destination depends on the treatment, the hospitals that respond to your case, your budget,
              language needs and how far you can travel. We help you weigh these together.
            </p>
          </div>
          <RouteBoard />
        </div>
      </section>
      <section className="band sunk">
        <div className="wrap">
          <div className="dest">
            {DESTINATIONS.map((d) => (
              <div className="dcard" key={d.code}>
                <div className="dest-head">
                  <Flag code={d.code} width={44} />
                  <h3>{d.name}</h3>
                </div>
                <i />
                <p>{d.text}</p>
              </div>
            ))}
            <div className="dcard other">
              <span className="code">WORLDWIDE</span>
              <h3>Other destinations</h3>
              <i />
              <p>Explored based on patient need, treatment type, budget and availability.</p>
            </div>
          </div>
          <p className="lead-i mt">
            Additional destinations may be explored based on medical advice, patient preference and hospital availability.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
