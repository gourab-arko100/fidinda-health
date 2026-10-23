import Link from "next/link";
import Flag from "@/components/Flag";
import RouteBoard from "@/components/RouteBoard";
import ServiceCard from "@/components/ServiceCard";
import FaqSection from "@/components/FaqSection";
import { CtaBand, Process, Rule } from "@/components/Blocks";
import { AREAS, DESTINATIONS, SERVICES, WHY } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="kicker">Medical value travel from Cambodia</span>
            <h1>Advanced Healthcare Abroad, Guided from Cambodia</h1>
            <p className="tag">Your trusted Cambodian partner for medical care abroad.</p>
            <p className="lede" style={{ marginBottom: 28 }}>
              We help Cambodian patients and families find suitable hospitals and specialists overseas, compare plans and
              costs, and manage travel, so you can focus on your health.
            </p>
            <div className="btns">
              <Link className="btn btn-red" href="/contact#enquiry">Share your medical records</Link>
              <Link className="btn btn-ghost" href="/services">Our services</Link>
            </div>
          </div>
          <RouteBoard />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <span className="kicker">Our purpose</span>
          <h2>Treatment abroad, made easier, safer and more organised</h2>
          <Rule />
          <p className="lede">
            Seeking treatment abroad involves choosing the right hospital and specialist, understanding costs, arranging
            appointments, preparing documents, managing travel and visas, and keeping everyone informed.
          </p>
          <div className="statement">
            We provide clear guidance, compassionate support and practical coordination so that patients can focus on their
            health while we manage the process around them.
          </div>
          <div className="pillars">
            {[
              ["Clear Guidance", "Honest, transparent information so patients can make informed decisions."],
              ["Compassionate Support", "Every patient is treated with care, respect and understanding throughout their journey."],
              ["Practical Coordination", "From documents to appointments to travel, we manage the details so you don't have to."],
            ].map(([t, d]) => (
              <div className="pillar" key={t}>
                <div className="dot" aria-hidden="true">✦</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band sunk">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="kicker">Our services</span>
              <h2>Helping you find and plan treatment abroad</h2>
              <Rule />
            </div>
            <Link className="textlink" href="/services">All 12 services →</Link>
          </div>
          <div className="scard-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard service={s} index={i + 1} key={s.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="kicker">How it works</span>
              <h2>Five steps from your reports to recovery</h2>
              <Rule aqua />
            </div>
            <Link className="textlink" href="/how-it-works">More detail →</Link>
          </div>
          <Process />
        </div>
      </section>

      <section className="band sunk">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="kicker">Destination focus</span>
              <h2>Where we guide patients</h2>
              <Rule />
            </div>
            <Link className="textlink" href="/destinations">All destinations →</Link>
          </div>
          <div className="dest">
            {DESTINATIONS.slice(0, 4).map((d) => (
              <div className="dcard" style={{ background: "var(--surface)" }} key={d.code}>
                <div className="dest-head">
                  <Flag code={d.code} width={44} />
                  <h3>{d.name}</h3>
                </div>
                <i />
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="kicker">Key treatment areas</span>
              <h2>We support patients across major specialties</h2>
              <Rule />
            </div>
            <Link className="textlink" href="/treatments">Treatment areas →</Link>
          </div>
          <div className="chips">
            {AREAS.map((a) => (
              <Link className="chip" href="/treatments" key={a.title}>{a.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band sunk">
        <div className="wrap">
          <span className="kicker">Why Fidinda</span>
          <h2>Why choose Fidinda Health Solutions?</h2>
          <Rule />
          <div className="why mt">
            {WHY.map((w, i) => (
              <div className="why-item" key={w.title}>
                <span className="num">{i + 1}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection />

      <CtaBand />
    </>
  );
}
