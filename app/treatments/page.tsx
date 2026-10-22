import type { Metadata } from "next";
import { CtaBand, PageHero, Rule } from "@/components/Blocks";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import TreatmentArt from "@/components/TreatmentArt";
import { AREAS } from "@/lib/content";

export const metadata: Metadata = { title: "Treatment areas" };

const ROWS = [
  ["Proposed treatment", "From hospital", "From hospital", "From hospital"],
  ["Hospital and doctor", "Name & specialty", "Name & specialty", "Name & specialty"],
  ["Expected hospital stay", "Days", "Days", "Days"],
  ["Stay outside hospital", "Days", "Days", "Days"],
  ["Tests that may be required", "Listed", "Listed", "Listed"],
  ["Estimated hospital cost", "Quotation", "Quotation", "Quotation"],
  ["Included / not included", "Listed", "Listed", "Listed"],
];

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        crumb="Treatments"
        kicker="Key treatment areas"
        title="Support across major medical specialties"
        lede="Whatever the condition, we start with your reports and ask suitable hospitals for their opinions, plans and estimated costs."
      />
      <section className="band">
        <div className="wrap">
          <div className="areas">
            {AREAS.map((a) => (
              <article className="area area-pic" key={a.title}>
                <div className="area-media">
                  {a.image ? (
                    <Image src={a.image} alt={a.title} fill sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw" style={{ objectFit: "cover" }} />
                  ) : (
                    <TreatmentArt name={a.art} title={a.title} />
                  )}
                </div>
                <div className="area-body">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <Link className="area-link" href="/contact#enquiry">Ask about this <Icon name="arrow" size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="band sunk">
        <div className="wrap split">
          <div>
            <span className="kicker">Treatment plan &amp; cost comparison</span>
            <h2>See your options side by side</h2>
            <Rule />
            <p className="lede">
              When possible, we put the hospitals&apos; responses into one simple comparison so your family can decide with
              confidence.
            </p>
            <p className="note mt">
              Hospital quotations are estimates only. The final treatment and cost may change after the doctor examines the
              patient.
            </p>
          </div>
          <div>
            <p className="lead-i" style={{ marginBottom: 10 }}>What your comparison covers. Real details come from each hospital.</p>
            <div className="compare">
              <table>
                <thead>
                  <tr><th>What we compare</th><th>Hospital A</th><th>Hospital B</th><th>Hospital C</th></tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r[0]}>
                      <td>{r[0]}</td>
                      {r.slice(1).map((c, i) => <td className="ph" key={i}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
