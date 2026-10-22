import type { Metadata } from "next";
import { CtaBand, PageHero, Process, RoleNote, Rule } from "@/components/Blocks";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        crumb="How it works"
        kicker="How our service works"
        title="Five steps from your reports to recovery"
        lede="One coordinator stays with you and your family the whole way. Here's what to expect."
      />
      <section className="band">
        <div className="wrap">
          <Process />
        </div>
      </section>
      <section className="band sunk">
        <div className="wrap split">
          <div>
            <span className="kicker">Before you contact us</span>
            <h2>Documents that help hospitals review your case</h2>
            <Rule />
            <p className="lede">Better information helps a better review. Gather what you can; we&apos;ll help with the rest.</p>
            <ul className="mt" style={{ paddingLeft: 20, display: "grid", gap: 6 }}>
              {SERVICES[0].points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <RoleNote />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
