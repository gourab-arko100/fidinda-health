// Sends form submissions to Fidinda's Telegram through a Telegram bot.
// Server-only: the bot token must never reach the browser.
//
// Settings (see README → "Telegram setup"):
//   TELEGRAM_BOT_TOKEN  the token @BotFather gives you
//   TELEGRAM_CHAT_ID    the Telegram account or group that should receive enquiries

const API = "https://api.telegram.org";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function telegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

// While testing on your own computer without a bot set up, enquiries are printed in the terminal instead.
export const devFallback = () => process.env.NODE_ENV !== "production" && !telegramConfigured();

type Result = { ok: true } | { ok: false; error: string };

async function call(method: string, body: BodyInit, json: boolean): Promise<Result> {
  try {
    const res = await fetch(`${API}/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: json ? { "Content-Type": "application/json" } : undefined,
      body,
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; description?: string };
    return data.ok ? { ok: true } : { ok: false, error: data.description || `Telegram error ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not reach Telegram" };
  }
}

export function sendTelegramMessage(html: string) {
  return call(
    "sendMessage",
    JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: html.length > 4000 ? html.slice(0, 3990) + "…" : html,
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }),
    true
  );
}

export function sendTelegramDocument(file: Blob, filename: string, captionHtml: string) {
  const form = new FormData();
  form.append("chat_id", String(process.env.TELEGRAM_CHAT_ID));
  form.append("document", file, filename);
  form.append("caption", captionHtml.slice(0, 1000));
  form.append("parse_mode", "HTML");
  return call("sendDocument", form, false);
}

// Short reference so documents can be matched to their enquiry, e.g. FHS-K4P2Q
export function newRef(prefix: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

// "Label: value" line in bold-label style; empty values are skipped
export const field = (label: string, value?: string) => (value && value.trim() ? `<b>${esc(label)}:</b> ${esc(value.trim())}` : "");
