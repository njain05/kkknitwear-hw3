import type { BasketItem } from "@/lib/types";
import { site } from "@/lib/site";

export type RfqDetails = {
  company: string;
  contact: string;
  phone: string;
  email: string;
  city: string;
  timeline: string;
  message: string;
};

export const EMPTY_DETAILS: RfqDetails = {
  company: "",
  contact: "",
  phone: "",
  email: "",
  city: "",
  timeline: "",
  message: "",
};

/**
 * One plain-text body used for every channel, so the enquiry reads the same
 * whether it lands on WhatsApp or in the inbox.
 */
export function buildRfqText(items: BasketItem[], d: RfqDetails): string {
  const lines: string[] = [`Quote request — ${site.name}`, ""];

  lines.push(`Company: ${d.company}`);
  if (d.contact) lines.push(`Contact: ${d.contact}`);
  if (d.phone) lines.push(`Phone: ${d.phone}`);
  if (d.email) lines.push(`Email: ${d.email}`);
  if (d.city) lines.push(`City: ${d.city}`);
  if (d.timeline) lines.push(`Required by: ${d.timeline}`);

  lines.push("", `Fabrics (${items.length}):`);
  items.forEach((item, i) => {
    const detail = [
      item.quantity && `quantity ${item.quantity}`,
      item.colour && `colour ${item.colour}`,
      item.note && `note: ${item.note}`,
    ]
      .filter(Boolean)
      .join(", ");
    lines.push(`${i + 1}. ${item.name}${detail ? ` — ${detail}` : ""}`);
  });

  if (d.message) lines.push("", "Message:", d.message);

  return lines.join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(text: string, company: string): string {
  const subject = `Quote request${company ? ` — ${company}` : ""}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(text)}`;
}

/**
 * Optional POST endpoint for logging RFQs (Formspree, Resend, a Lambda —
 * anything that accepts JSON). Unset until the client picks one, in which
 * case the form falls back to the buyer's own mail client.
 */
export const RFQ_ENDPOINT = process.env.NEXT_PUBLIC_RFQ_ENDPOINT ?? "";
