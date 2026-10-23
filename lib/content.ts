// All site copy lives here, taken from the Fidinda Health Solutions business profile.
// Edit this file to change text across the site.

import type { FlagCode } from "@/components/Flag";
import type { IconName } from "@/components/Icon";
import type { ArtName } from "@/components/TreatmentArt";

export const COMPANY = {
  name: "Fidinda Health Solutions",
  tagline: "Advanced Healthcare Abroad, Guided from Cambodia",
  subTagline: "Your trusted Cambodian partner for medical care abroad.",
  slogan: "Clear Information. More Choices. Better Support.",
  parent: "Fidinda Financial and Management Solutions Co., Ltd.",
  registeredIn: "Kingdom of Cambodia",
  registeredWith: "Ministry of Commerce, Kingdom of Cambodia",
  registrationNo: "10003371",
  vatTin: "K007-902305537",
  website: "www.fidindasolutions.com",
  email: "info@fidindasolutions.com",
  phoneKhmer: "+855 16 812 444",
  phoneEnglish: "+855 17 457 244",
};

export const tel = (n: string) => "tel:" + n.replace(/\s/g, "");

// WhatsApp number used by the floating "Chat on WhatsApp" button (digits only, with country code).
// Change this if Fidinda uses a different WhatsApp number.
export const WHATSAPP = "85516812444";
export const WHATSAPP_TEXT = "Hello, I would like help planning medical treatment abroad.";

// Telegram number for the "Chat on Telegram" buttons.
// Form submissions go to Telegram through a bot (see README → "Telegram setup").
export const TELEGRAM = "+85516812444";
export const TELEGRAM_DISPLAY = "+855 16 812 444";
export const TELEGRAM_LINK = `https://t.me/${TELEGRAM}`;

// Social media links shown under "Follow us" in the footer.
// Paste each profile URL; any left empty ("") is hidden automatically.
export const SOCIAL: { name: "facebook" | "telegram" | "instagram" | "linkedin" | "youtube" | "tiktok" | "maps"; url: string }[] = [
  { name: "facebook", url: "https://www.facebook.com/profile.php?id=61591654326318" },
  { name: "telegram", url: "" },
  { name: "instagram", url: "https://www.instagram.com/fidinda.solutions" },
  { name: "linkedin", url: "" },
  { name: "youtube", url: "" },
  { name: "tiktok", url: "" },
  { name: "maps", url: "" },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/treatments", label: "Treatments" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/who-we-serve", label: "Who we serve" },
  { href: "/contact", label: "Contact" },
];

export type Service = { title: string; short: string; intro: string; points: string[]; note: string; icon: IconName };

export const SERVICES: Service[] = [
  { title: "Medical Record Support", short: "Understand your case clearly", icon: "records",
    intro: "The first step is to understand your case clearly. We help you collect and organise:",
    points: ["Medical reports", "Laboratory test results", "Scans and X-rays", "Doctor's notes", "Current prescriptions", "Previous treatment information"],
    note: "With your permission, we send these documents to selected hospitals for review." },
  { title: "Hospital and Doctor Options", short: "Receive choices from several countries", icon: "hospital",
    intro: "Different hospitals may offer different doctors, treatment plans, facilities and prices. We help you receive options from hospitals in different countries, based on:",
    points: ["Your medical reports", "The type of treatment required", "Hospital responses", "Your preferred country", "Your available budget", "Language and travel needs"],
    note: "We provide choices and information. We do not force you to select any hospital or doctor." },
  { title: "Second Medical Opinion Support", short: "Another opinion before you decide", icon: "opinion",
    intro: "Sometimes a patient or family wants another medical opinion before making a decision. We help you request one from a qualified doctor or hospital, which may help you understand:",
    points: ["The medical condition", "Possible treatment choices", "Whether more tests are needed", "The expected treatment period", "Possible risks explained by the doctor"],
    note: "The medical opinion is provided directly by the doctor or hospital, not by Fidinda Health Solutions." },
  { title: "Treatment Plan and Cost Comparison", short: "Compare plans side by side", icon: "compare",
    intro: "We help you request treatment plans and estimated costs from selected hospitals. When possible, we prepare a simple comparison showing:",
    points: ["Proposed treatment", "Hospital and doctor information", "Estimated hospital cost", "Expected hospital stay", "Expected stay outside the hospital", "Tests that may be required", "Services included in the estimate", "Services not included in the estimate"],
    note: "Hospital quotations are estimates only. The final treatment and cost may change after the doctor examines the patient." },
  { title: "Online Consultation Support", short: "Speak with a doctor before travelling", icon: "video",
    intro: "An online consultation may help the patient speak with a doctor before travelling. We help coordinate it and may assist with:",
    points: ["Appointment booking", "Sending medical documents", "Sharing the consultation link", "Preparing questions for the hospital", "Receiving instructions from the hospital"],
    note: "The doctor is responsible for all medical advice given during the consultation." },
  { title: "Hospital Appointment and Admission Support", short: "Connected with the international patient department", icon: "calendar",
    intro: "After you select a hospital, we coordinate with its international patient department. Our support may include:",
    points: ["Confirming the doctor's appointment", "Requesting a hospital invitation letter", "Sharing required documents", "Confirming the expected admission date", "Coordinating pre-treatment instructions", "Helping with hospital registration", "Keeping the patient and hospital connected"],
    note: "All treatment, admission and discharge decisions are made by the hospital." },
  { title: "Visa and Travel Support", short: "Prepare for the journey", icon: "plane",
    intro: "We help patients and accompanying family members prepare for their journey. Our travel support may include:",
    points: ["Guidance for the visa application", "Support with flight booking", "Airport pickup and drop-off", "Local transport arrangements", "Information about the destination country", "Basic travel planning"],
    note: "Visa approval is decided only by the relevant embassy or immigration authority." },
  { title: "Accommodation Support", short: "A place to stay near the hospital", icon: "bed",
    intro: "Patients may need a hotel, guest house or apartment near the hospital. We help you find suitable accommodation based on:",
    points: ["Distance from the hospital", "Length of stay", "Number of family members", "Available budget", "Basic accessibility needs", "Cooking or food requirements"],
    note: "Accommodation may be arranged through hotels, property providers or other service partners." },
  { title: "Language and Communication Support", short: "Understand every conversation", icon: "language",
    intro: "Language should not stop a patient from understanding important information. We can help arrange language support during:",
    points: ["Hospital appointments", "Doctor consultations", "Admission", "Testing", "Billing discussions", "Discharge", "Follow-up consultations"],
    note: "Translation may be provided by our own translators, the hospital or an independent language service provider." },
  { title: "Support During Your Stay", short: "A coordinator stays connected", icon: "support",
    intro: "Our patient coordinator remains connected with the patient and family during the medical journey. We may help with:",
    points: ["Hospital communication", "Appointment schedules", "Hospital documents", "Billing questions", "Local travel information", "Communication with family members", "Coordination with service providers"],
    note: "Medical questions are always referred to the treating doctor or hospital." },
  { title: "Discharge and Medical Document Support", short: "Go home with complete records", icon: "discharge",
    intro: "Before the patient returns home, we help check that important hospital documents have been collected. These may include:",
    points: ["Discharge summary", "Test reports", "Scan reports", "Doctor's advice", "Prescription", "Follow-up schedule", "Medical certificate, when provided", "Hospital invoices and payment receipts"],
    note: "All documents are prepared and issued by the hospital or healthcare provider." },
  { title: "Follow-Up Support After Returning Home", short: "Care continues at home", icon: "followup",
    intro: "Care may continue after the patient returns home. We help coordinate communication between the patient and the treating hospital, including:",
    points: ["Booking an online follow-up consultation", "Sending new test results to the hospital", "Receiving follow-up instructions", "Organising medical records", "Sharing documents with your local doctor, with permission", "Scheduling future hospital visits when required"],
    note: "All follow-up medical advice must come from a qualified doctor." },
];

// Which part of each service photo to keep in view when the frame trims it ("x% y%").
// Lower y = keep more of the top (faces). Photos not listed stay centred.
export const SERVICE_PHOTO_FOCUS: Record<number, string> = {
  1: "50% 12%",
  6: "50% 22%",
  7: "50% 14%",
  8: "50% 30%",
  10: "50% 22%",
  11: "50% 30%",
  12: "50% 30%",
};

// Services grouped by stage of the patient journey (numbers are 1-based service positions)
export const PHASES = [
  { title: "Before you decide", text: "Understand the case and see your options.", services: [1, 2, 3, 4, 5] },
  { title: "Planning the trip", text: "Book the hospital, travel and a place to stay.", services: [6, 7, 8] },
  { title: "During treatment", text: "Stay informed and supported in a new country.", services: [9, 10] },
  { title: "After treatment", text: "Go home with your records and continued care.", services: [11, 12] },
];

export const DESTINATIONS: { code: FlagCode; name: string; text: string }[] = [
  { code: "IN", name: "India", text: "Advanced specialist hospitals, competitive costs and established medical value travel infrastructure." },
  { code: "MY", name: "Malaysia", text: "Patient-friendly healthcare travel, trusted hospitals and an organised ecosystem." },
  { code: "SG", name: "Singapore", text: "Advanced tertiary care, specialist treatment and high-standard services." },
  { code: "TW", name: "Taiwan", text: "Quality healthcare, advanced diagnostics and specialised treatment options." },
  { code: "VN", name: "Vietnam", text: "Accessible regional care in a familiar destination for Cambodian patients." },
  { code: "EG", name: "Egypt", text: "Specialist healthcare in selected disciplines and a growing international destination." },
];

// Treatment areas. Each card shows its illustration ("art").
// To use a real photo instead, put it in public/treatments/ and add  image: "/treatments/heart.jpg"
export const AREAS: { title: string; text: string; art: ArtName; image?: string }[] = [
  { title: "Cardiology & Heart Surgery", text: "Heart checks, angioplasty, bypass and valve surgery." , art: "heart" },
  { title: "Cancer Care & Oncology", text: "Diagnosis, surgery, chemotherapy and radiotherapy planning." , art: "cancer" },
  { title: "Neurology & Neurosurgery", text: "Brain and spine conditions, stroke care and surgery." , art: "brain" },
  { title: "Orthopaedics & Joint Replacement", text: "Knee and hip replacement, spine and sports injuries." , art: "bone" },
  { title: "Gastroenterology & Liver Care", text: "Digestive disorders, endoscopy and liver treatment." , art: "liver" },
  { title: "Kidney & Urology Care", text: "Kidney disease, dialysis planning, stones and prostate care." , art: "kidney" },
  { title: "Women's Health & Fertility", text: "Gynaecology, pregnancy care and fertility treatment." , art: "women" },
  { title: "Paediatrics & Child Health", text: "Specialist care and surgery for children." , art: "child" },
  { title: "Dental, ENT & Eye Care", text: "Dental work, ear, nose and throat, cataract and vision care." , art: "dental" },
  { title: "Diabetes & Chronic Disease", text: "Long-term management plans and specialist reviews." , art: "diabetes" },
  { title: "Executive Health Check-ups", text: "Comprehensive preventive screening packages." , art: "checkup" },
  { title: "Rehabilitation & Recovery", text: "Physiotherapy and recovery after surgery or illness." , art: "rehab" },
];

export const WHY = [
  { title: "Cambodia-Based Guidance", text: "We understand the concerns, language needs and practical challenges faced by Cambodian patients." },
  { title: "Professional & Transparent", text: "Our service is built on trust, transparency, compliance, client care and structured coordination." },
  { title: "Personalised Patient Support", text: "Every case is different. We explore options based on each patient's condition and needs." },
  { title: "End-to-End Coordination", text: "From documents to hospital communication, appointments, travel and follow-up." },
  { title: "Ethical Facilitation", text: "Clear information, realistic guidance and open communication before treatment decisions." },
  { title: "Family-Centred Care", text: "We support both patients and family attendants throughout the entire process." },
];

export const STEPS = [
  { title: "Share Your Medical Records", text: "Send us reports, scans and treatment history." },
  { title: "Receive Hospital Options", text: "We contact hospitals and request information." },
  { title: "Compare and Decide", text: "Review doctors, plans and estimated costs." },
  { title: "Plan Your Journey", text: "We coordinate appointments, travel and accommodation." },
  { title: "Ongoing Support", text: "We stay connected during and after care." },
];

export const VALUES = [
  { title: "Care", text: "We treat every patient with compassion, respect and dignity.", solid: true },
  { title: "Trust", text: "We build confidence through honest communication.", solid: true },
  { title: "Transparency", text: "We encourage clear information on costs, options and processes.", solid: true },
  { title: "Professionalism", text: "We maintain structured coordination and proper documentation.", solid: false },
  { title: "Responsibility", text: "We guide patients carefully while respecting medical decisions by qualified doctors.", solid: false },
  { title: "Accessibility", text: "We aim to make advanced healthcare abroad more reachable for Cambodian families.", solid: false },
];

export const WHO_WE_SERVE = [
  "Cambodian patients seeking advanced treatment abroad",
  "Families looking for second medical opinions",
  "Patients requiring specialised surgery or diagnostics",
  "Patients seeking cancer, cardiac, neurological or orthopaedic care",
  "Families comparing treatment costs and hospital options",
  "Patients needing medical visa and travel guidance",
  "Corporate clients seeking healthcare support for staff",
  "Cambodian clinics or doctors seeking referral coordination",
];

export const PARTNERS = [
  "International hospitals and specialist centres", "Medical travel departments", "Diagnostic centres", "Insurance providers",
  "Travel agencies", "Hotels and serviced apartments", "Ambulance and patient transport providers", "Cambodian clinics",
  "Medical professionals", "Corporate employers and welfare organisations",
];

export const FAQ = [
  { id: "start", title: "Getting started", items: [
    ["What does Fidinda Health Solutions do?", "We are a medical travel facilitation service. We help Cambodian patients collect their records, receive options from hospitals abroad, compare plans and estimated costs, and arrange appointments, travel, accommodation and follow-up."],
    ["Are you a hospital or clinic?", "No. We are not a hospital, clinic or medical treatment provider. All diagnoses, medical opinions, treatment plans and costs come from the selected doctors and hospitals."],
    ["What do I need to send first?", "Your medical reports, lab results, scans and X-rays, doctor's notes, current prescriptions and any previous treatment information. Send what you have and we'll help with the rest."],
    ["Do I have to choose a hospital you suggest?", "No. We provide choices and information. You and your family make the final decision."],
  ]},
  { id: "medical", title: "Medical opinions", items: [
    ["Can I get a second opinion before deciding?", "Yes. We help you request a second opinion from a qualified doctor or hospital. The opinion is given directly by the doctor or hospital."],
    ["Can I speak with a doctor before travelling?", "Yes. We can coordinate an online consultation, send your documents in advance and help you prepare questions."],
    ["Are the cost estimates final?", "No. Hospital quotations are estimates only. The final treatment and cost may change after the doctor examines the patient."],
  ]},
  { id: "travel", title: "Travel & stay", items: [
    ["Do you help with visas?", "We guide you and accompanying family members through the visa application. Visa approval is decided only by the relevant embassy or immigration authority."],
    ["Can you arrange accommodation?", "Yes. We help you find a hotel, guest house or apartment near the hospital based on your budget, length of stay, family size and food needs."],
    ["What if we don't speak the local language?", "We can arrange interpreters for appointments, admission, tests, billing, discharge and follow-up, through our own translators, the hospital or an independent provider."],
  ]},
  { id: "after", title: "After treatment", items: [
    ["Will I get my medical documents?", "Before you return home, we help check that your discharge summary, reports, prescriptions, follow-up schedule and invoices have been collected."],
    ["Do you help after I come home?", "Yes. We can book online follow-ups, send new test results to the hospital and share documents with your local doctor, with your permission."],
  ]},
] as const;
