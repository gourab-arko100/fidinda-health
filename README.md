# Fidinda Health Solutions — website

Next.js (App Router, TypeScript) website for Fidinda Health Solutions.

## Run it on your computer

You need **Node.js 18.18 or newer** (Node 20 or 22 recommended). Check with `node -v`.

```bash
cd fidinda-health
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

The page reloads by itself when you save a file.

## Pages

| URL | File |
|---|---|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/destinations` | `app/destinations/page.tsx` |
| `/treatments` | `app/treatments/page.tsx` |
| `/how-it-works` | `app/how-it-works/page.tsx` |
| `/who-we-serve` | `app/who-we-serve/page.tsx` |
| `/faq` | `app/faq/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

## Where to edit things

- **All text** (services, destinations, FAQ, phone numbers, company details): `lib/content.ts`
- **Header** (top bar, logo, menu, Services dropdown, mobile menu): `components/Header.tsx`
- **Footer**: `components/Footer.tsx`
- **Colours and styles**: `app/globals.css` (brand colours are the variables at the top)
- **Logo**: `public/logo.png`

## Contact form

The form sends to `app/api/enquiry/route.ts`. Right now each enquiry is printed in the terminal where `npm run dev` is running.

To receive enquiries by email, connect a mail service (for example Resend or Nodemailer with Gmail SMTP) inside that file, and keep API keys in a `.env.local` file.

## Production build

```bash
npm run build
npm start
```

To put it online, push the folder to GitHub and import the repository in Vercel.
