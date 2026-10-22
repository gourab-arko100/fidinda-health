import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { PHASES, SERVICES, SERVICE_PHOTO_FOCUS } from "@/lib/content";

export const metadata: Metadata = { title: "Our services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        kicker="Our services"
        title="Helping you find and plan treatment abroad"
        lede="Twelve services that cover the whole journey, from your first medical report to follow-up care at home. Use only the ones you need."
      />

      {/* Journey overview: four stages, each listing its services */}
      <section className="band tight">
        <div className="wrap">
          <div className="phase-strip">
            {PHASES.map((ph, pi) => (
              <a className="phase-tab" href={`#phase-${pi + 1}`} key={ph.title}>
                <span className="phase-n">Stage {pi + 1}</span>
                <b>{ph.title}</b>
                <span className="phase-icons">
                  {ph.services.map((n) => (
                    <span className="mini-ic" key={n} title={SERVICES[n - 1].title}>
                      <Icon name={SERVICES[n - 1].icon} size={16} />
                    </span>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {PHASES.map((ph, pi) => (
        <section className={`band phase${pi % 2 === 0 ? " sunk" : ""}`} id={`phase-${pi + 1}`} key={ph.title}>
          <div className="wrap">
            <div className="phase-head">
              <span className="phase-n">Stage {pi + 1} of {PHASES.length}</span>
              <h2>{ph.title}</h2>
              <p className="lede">{ph.text}</p>
            </div>
            <div className="sdetail-list">
              {ph.services.map((n) => {
                const s = SERVICES[n - 1];
                return (
                  <article className={`sdetail${n % 2 === 0 ? " flip" : ""}`} id={`s${n}`} key={s.title}>
                    <div className="sdetail-media">
                      <Image src={`/services/s${n}.jpg`} alt={s.title} fill sizes="(max-width: 860px) 100vw, 40vw" style={{ objectFit: "cover", objectPosition: SERVICE_PHOTO_FOCUS[n] ?? "50% 50%" }} />
                      <span className="scard-chip">{String(n).padStart(2, "0")}</span>
                      <span className="ic lg ic-float"><Icon name={s.icon} size={30} /></span>
                    </div>
                    <div className="sdetail-body">
                      <h3>{s.title}</h3>
                      <p className="sdetail-intro">{s.intro}</p>
                      <ul className="checks">
                        {s.points.map((p) => (
                          <li key={p}>
                            <span className="tick"><Icon name="check" size={13} /></span>
                            {p}
                          </li>
                        ))}
                      </ul>
                      <p className="callout">
                        <Icon name="info" size={18} />
                        <span>{s.note}</span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
