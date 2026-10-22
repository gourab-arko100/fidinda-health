import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/Blocks";
import { FAQ } from "@/lib/content";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        kicker="FAQ"
        title="Questions families ask us"
        lede="Can't find your answer? Call us in Khmer or English and a coordinator will help."
      />
      <section className="band">
        <div className="wrap faq-layout">
          <nav className="faq-nav" aria-label="FAQ topics">
            {FAQ.map((g) => <a key={g.id} href={`#${g.id}`}>{g.title}</a>)}
          </nav>
          <div>
            {FAQ.map((g) => (
              <div className="faq-group" id={g.id} key={g.id}>
                <h2>{g.title}</h2>
                <div className="faq">
                  {g.items.map(([q, a]) => (
                    <details key={q}>
                      <summary>{q}</summary>
                      <p>{a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
