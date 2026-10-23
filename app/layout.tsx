import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import { COMPANY } from "@/lib/content";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-montserrat" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: { default: `${COMPANY.name} | ${COMPANY.tagline}`, template: `%s | ${COMPANY.name}` },
  description:
    "Fidinda Health Solutions helps Cambodian patients and families find, plan and manage medical treatment abroad, with support for records, second opinions, hospital options, visas, travel and follow-up.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}
