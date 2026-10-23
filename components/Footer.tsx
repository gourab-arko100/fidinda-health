import Image from "next/image";
import Link from "next/link";
import { COMPANY, DESTINATIONS, SOCIAL, WHATSAPP, WHATSAPP_TEXT, tel, TELEGRAM_DISPLAY, TELEGRAM_LINK } from "@/lib/content";

// Simple line icons for the "Follow us" row
const SOCIAL_ICONS: Record<(typeof SOCIAL)[number]["name"], React.ReactNode> = {
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />,
  telegram: <path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15zM9 13l9-6-7 8" />,
  instagram: (<><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17" cy="7" r=".6" /></>),
  linkedin: (<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 10v6M8 7.5v.1M12 16v-3.5a2 2 0 0 1 4 0V16M12 10v6" /></>),
  youtube: (<><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5v5l4-2.5z" /></>),
  tiktok: <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.5 2.5 2.3 4 5 4" />,
  maps: (<><path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.2" /></>),
};

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Services",
    links: [
      ["Medical Record Support", "/services#s1"],
      ["Hospital & Doctor Options", "/services#s2"],
      ["Second Medical Opinion", "/services#s3"],
      ["Cost Comparison", "/services#s4"],
      ["Online Consultation", "/services#s5"],
      ["All Services", "/services"],
    ],
  },
  {
    title: "Destinations",
    links: [
      ...DESTINATIONS.map((d): [string, string] => [d.name, "/destinations"]),
      ["Other Destinations", "/destinations"],
      ["All Destinations", "/destinations"],
    ],
  },
  {
    title: "For Patients",
    links: [
      ["How It Works", "/how-it-works"],
      ["Second Opinion", "/services#s3"],
      ["Hospital Appointments", "/services#s6"],
      ["Visa & Travel", "/services#s7"],
      ["Accommodation", "/services#s8"],
      ["Interpreters", "/services#s9"],
      ["Follow-Up Care", "/services#s12"],
      ["Treatment Areas", "/treatments"],
      ["Send an Enquiry", "/contact#enquiry"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Vision & Mission", "/about"],
      ["Core Values", "/about#values"],
      ["Who We Serve", "/who-we-serve"],
      ["Partnerships", "/who-we-serve#partners"],
      ["Become a Partner", "/partner"],
      ["Contact Us", "/contact"],
      ["Our Role", "/about#role"],
    ],
  },
];

export default function Footer() {
  const socials = SOCIAL.filter((s) => s.url);
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

  return (
    <>
      <footer className="ft">
        <div className="wrap">
          <div className="ft-grid">
            <div className="ft-brand">
              <Link className="logo" href="/">
                <Image src="/logo.png" alt={COMPANY.name} width={664} height={164} style={{ height: 40, width: "auto" }} />
              </Link>
              <p className="ft-about">
                Helping Cambodian patients and families plan treatment abroad with clear information, trusted hospitals and
                support from first enquiry to recovery.
              </p>
              <ul className="ft-contact">
                <li><b>Call (Khmer)</b> <a href={tel(COMPANY.phoneKhmer)}>{COMPANY.phoneKhmer}</a></li>
                <li><b>Call (English)</b> <a href={tel(COMPANY.phoneEnglish)}>{COMPANY.phoneEnglish}</a></li>
                <li><b>Telegram</b> <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">{TELEGRAM_DISPLAY}</a></li>
                <li><b>Email</b> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
                <li><b>{COMPANY.website}</b></li>
                <li className="ft-place">{COMPANY.registeredIn}</li>
              </ul>
              {socials.length > 0 && (
                <>
                  <span className="ft-follow">Follow us</span>
                  <div className="ft-social">
                    {socials.map((s) => (
                      <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {SOCIAL_ICONS[s.name]}
                        </svg>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            {COLUMNS.map((col) => (
              <nav className="ft-col" aria-label={col.title} key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map(([label, href]) => (
                    <li key={label}><Link href={href}>{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="ft-bottom">
            <div className="ft-row">
              <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved. A division of {COMPANY.parent}</p>
              <div className="ft-reg">
                <span>Registration No. {COMPANY.registrationNo} · VAT TIN {COMPANY.vatTin}</span>
                <span className="ft-badge"><b>KH</b>REGISTERED</span>
              </div>
            </div>
            <p className="ft-small">
              {COMPANY.name} is a division of {COMPANY.parent}, registered with the {COMPANY.registeredWith}.
            </p>
            <p className="ft-small">
              {COMPANY.name} is a healthcare facilitation service, not a hospital, clinic or medical treatment provider. All
              diagnoses, medical opinions, treatment plans and costs are provided by the selected doctors and hospitals.{" "}
              <Link href="/about#role">Read about our role.</Link>
            </p>
          </div>
        </div>
      </footer>

      <div className="fab">
        <Link className="fab-btn fab-quote" href="/contact#enquiry">
          Get cost estimate
          <span className="fab-ic" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" />
            </svg>
          </span>
        </Link>
        <div className="fab-row">
          <a className="fab-btn fab-wa" href={waLink} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <span className="fab-label">WhatsApp</span>
            <span className="fab-ic" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
                <path d="M9 8.5c0 3 2.5 5.8 5.5 6.5l1.2-1.4-1.9-1-1 .8a5 5 0 0 1-2.2-2.2l.8-1-1-1.9z" />
              </svg>
            </span>
          </a>
          <a className="fab-btn fab-tg" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on Telegram">
            <span className="fab-label">Telegram</span>
            <span className="fab-ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 4L3 11l6 2 2 6 3-4 5 4 2-15z" /><path d="M9 13l9-6-7 8" /></svg></span>
          </a>
        </div>
      </div>
    </>
  );
}
