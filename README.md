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

## Forms → Telegram

The patient enquiry form (`/contact`) and the partnership form (`/partner`) send every
submission, including any uploaded medical documents, to Fidinda's Telegram through a
Telegram bot. Visitors don't need to open any app.

Without the two settings below, enquiries are printed in the `npm run dev` terminal
instead (testing only). On the live site the forms show an error until Telegram is set up.

### Telegram setup (about 5 minutes, one time)

1. **Create the bot.** In Telegram, open **@BotFather**, send `/newbot`, give it a name
   (e.g. *Fidinda Enquiries*) and a username ending in `bot` (e.g. `FidindaEnquiriesBot`).
   BotFather replies with a **token** like `7412345678:AAH...`. Keep it private.
2. **Start the bot.** From the Telegram account that should receive enquiries
   (+855 16 812 444), open your new bot and press **Start**.
   *For a team group instead:* add the bot to the group and send any message there.
3. **Find the chat ID.** In a browser, open
   `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
   and look for `"chat":{"id":` followed by a number. That number is the chat ID
   (group IDs start with `-100`).
4. **On your computer:** copy `.env.example` to `.env.local`, fill in both values,
   and restart `npm run dev`.
5. **On Vercel:** Project → **Settings → Environment Variables** → add
   `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` → then **Deployments → Redeploy**.

Send a test enquiry. It should arrive in Telegram within a second or two.

Documents: up to 5 files, 4 MB each (PDF, JPG, PNG, HEIC, Word). They are passed
straight to Telegram and never stored on the website.

## Production build

```bash
npm run build
npm start
```

To put it online, push the folder to GitHub and import the repository in Vercel.
