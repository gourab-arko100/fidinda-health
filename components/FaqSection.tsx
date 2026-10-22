"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY, FAQ, WHATSAPP, tel } from "@/lib/content";
import Icon from "./Icon";

// FAQ block for the home page: topic tabs on the left, questions on the right.
export default function FaqSection() {
  const [topic, setTopic] = useState<string>(FAQ[0].id);
  const [open, setOpen] = useState<string | null>(FAQ[0].items[0][0]);
  const group = FAQ.find((g) => g.id === topic) ?? FAQ[0];

  function pick(id: string) {
    setTopic(id);
    const g = FAQ.find((x) => x.id === id);
    setOpen(g ? g.items[0][0] : null);
  }

  return (
    <section className="band" id="faq">
      <div className="wrap faq-home">
        <div className="faq-side">
          <span className="kicker">FAQ</span>
          <h2>Questions families ask before travelling</h2>
          <span className="rule" />
          <div className="faq-topics" role="tablist" aria-label="FAQ topics">
            {FAQ.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={topic === g.id}
                className="faq-topic"
                onClick={() => pick(g.id)}
              >
                {g.title}
                <span className="faq-count">{g.items.length}</span>
              </button>
            ))}
          </div>
          <div className="faq-ask">
            <b>Still have a question?</b>
            <p>Talk to a coordinator in Khmer or English.</p>
            <div className="btns">
              <a className="btn btn-wa" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              <a className="btn btn-ghost" href={tel(COMPANY.phoneKhmer)}>Call {COMPANY.phoneKhmer}</a>
            </div>
          </div>
        </div>

        <div className="faq-list" role="tabpanel" aria-label={group.title}>
          {group.items.map(([q, a]) => {
            const isOpen = open === q;
            const id = `faq-${q.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={q}>
                <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : q)}>
                  <span>{q}</span>
                  <span className="faq-sign" aria-hidden="true" />
                </button>
                <div className="faq-a" id={id} hidden={!isOpen}>
                  <p>{a}</p>
                </div>
              </div>
            );
          })}
          <p className="faq-more">
            <Icon name="info" size={16} />
            <span>
              Ready to start? <Link href="/contact#enquiry">Send your enquiry</Link> and share your reports with us.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
