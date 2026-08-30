"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuoteBasket } from "@/lib/quote-basket";
import {
  buildRfqText,
  whatsappUrl,
  mailtoUrl,
  EMPTY_DETAILS,
  RFQ_ENDPOINT,
  type RfqDetails,
} from "@/lib/rfq";
import { site } from "@/lib/site";
import { FabricTexture } from "@/components/textures/FabricTexture";

type Photos = Record<string, string | null>;

const FIELDS: {
  key: keyof RfqDetails;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  half?: boolean;
}[] = [
  { key: "company", label: "Company name", required: true, half: true },
  { key: "contact", label: "Your name", half: true },
  { key: "phone", label: "Phone or WhatsApp", type: "tel", half: true },
  { key: "email", label: "Email", type: "email", half: true },
  { key: "city", label: "City", half: true },
  { key: "timeline", label: "Required by", placeholder: "e.g. within 3 weeks", half: true },
];

export function QuoteRequest({ photos }: { photos: Photos }) {
  const { items, update, remove, clear, ready } = useQuoteBasket();
  const [details, setDetails] = useState<RfqDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<Partial<Record<keyof RfqDetails, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const set = (key: keyof RfqDetails, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof RfqDetails, string>> = {};
    if (!details.company.trim()) next.company = "Enter your company name";
    if (!details.phone.trim() && !details.email.trim()) {
      next.phone = "Add a phone number or an email so we can reply";
    }
    if (details.email.trim() && !/^\S+@\S+\.\S+$/.test(details.email.trim())) {
      next.email = "Check this email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const text = buildRfqText(items, details);

  async function submit(channel: "whatsapp" | "email") {
    if (honeypot) return; // bot
    if (!validate()) return;

    // Log the enquiry if an endpoint is configured; never block the buyer on it.
    if (RFQ_ENDPOINT) {
      setSending(true);
      try {
        await fetch(RFQ_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...details, items, text }),
        });
      } catch {
        // Falls through to the direct channel below.
      }
      setSending(false);
    }

    window.open(
      channel === "whatsapp" ? whatsappUrl(text) : mailtoUrl(text, details.company),
      channel === "whatsapp" ? "_blank" : "_self",
    );
    setSent(true);
  }

  if (!ready) {
    return <div className="py-24 text-ink-3">Loading your request…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="relative border border-rule overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
          <FabricTexture structure="jersey" ground="paper2" scale={2.2} />
        </div>
        <div className="relative py-20 px-6 text-center">
          <h2 className="text-xl text-ink">Your quote request is empty</h2>
          <p className="mt-3 text-ink-2 max-w-md mx-auto leading-relaxed">
            Add the qualities you want a rate on and send them as one request.
            You can ask about as many as you like.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link href="/fabrics" className="bg-indigo text-paper px-6 py-3.5">
              Browse fabrics
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink px-6 py-3.5 text-ink"
            >
              Just message us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
      <div>
        <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-rule">
          <h2 className="text-sm text-ink">
            <span className="figure-mono">{items.length}</span>{" "}
            {items.length === 1 ? "fabric" : "fabrics"}
          </h2>
          <button
            type="button"
            onClick={clear}
            className="text-2xs text-ink-3 hover:text-clay"
          >
            Remove all
          </button>
        </div>

        <ul className="space-y-5">
          {items.map((item) => {
            const photo = photos[item.slug];
            return (
              <li key={item.slug} className="flex gap-4 pb-5 border-b border-rule">
                <div className="relative w-20 h-24 shrink-0 bg-paper-2 overflow-hidden">
                  {photo && (
                    <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/fabrics/${item.slug}`}
                      className="text-ink hover:text-indigo transition-colors"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(item.slug)}
                      aria-label={`Remove ${item.name} from your request`}
                      className="text-ink-3 hover:text-clay shrink-0 p-1 -m-1"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 grid sm:grid-cols-3 gap-2">
                    <input
                      value={item.quantity}
                      onChange={(e) => update(item.slug, { quantity: e.target.value })}
                      placeholder="Quantity (kg)"
                      aria-label={`Quantity of ${item.name}`}
                      className="border border-rule bg-paper px-2.5 py-2 text-sm placeholder:text-ink-3/70 focus:border-indigo focus:outline-none"
                    />
                    <input
                      value={item.colour}
                      onChange={(e) => update(item.slug, { colour: e.target.value })}
                      placeholder="Colour"
                      aria-label={`Colour for ${item.name}`}
                      className="border border-rule bg-paper px-2.5 py-2 text-sm placeholder:text-ink-3/70 focus:border-indigo focus:outline-none"
                    />
                    <input
                      value={item.note}
                      onChange={(e) => update(item.slug, { note: e.target.value })}
                      placeholder="Note"
                      aria-label={`Note about ${item.name}`}
                      className="border border-rule bg-paper px-2.5 py-2 text-sm placeholder:text-ink-3/70 focus:border-indigo focus:outline-none"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-rule p-5 md:p-7 bg-paper-2 lg:sticky lg:top-28"
      >
        <h2 className="text-lg text-ink">Your details</h2>
        <p className="mt-1.5 text-2xs text-ink-3">
          We reply with a rate, a lead time and a sample if you need one.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {FIELDS.map((f) => (
            <div key={f.key} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
              <label htmlFor={f.key} className="label-caps text-ink-3 block mb-1.5">
                {f.label}
                {f.required && <span className="text-clay ml-1">*</span>}
              </label>
              <input
                id={f.key}
                type={f.type ?? "text"}
                value={details[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => set(f.key, e.target.value)}
                aria-invalid={!!errors[f.key]}
                aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
                className={`w-full border bg-paper px-3 py-2.5 text-sm focus:outline-none ${
                  errors[f.key] ? "border-clay" : "border-rule focus:border-indigo"
                }`}
              />
              {errors[f.key] && (
                <p id={`${f.key}-error`} className="mt-1 text-2xs text-clay">
                  {errors[f.key]}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2">
            <label htmlFor="message" className="label-caps text-ink-3 block mb-1.5">
              Anything else
            </label>
            <textarea
              id="message"
              rows={3}
              value={details.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="GSM, width, shade card, sample requirement…"
              className="w-full border border-rule bg-paper px-3 py-2.5 text-sm placeholder:text-ink-3/70 focus:border-indigo focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
          <label htmlFor="company-url">Do not fill this in</label>
          <input
            id="company-url"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => submit("whatsapp")}
            disabled={sending}
            className="w-full bg-indigo text-paper py-3.5 hover:bg-indigo-deep transition-colors disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send on WhatsApp"}
          </button>
          <button
            type="button"
            onClick={() => submit("email")}
            disabled={sending}
            className="w-full border border-ink text-ink py-3.5 hover:bg-ink hover:text-paper transition-colors disabled:opacity-60"
          >
            Send by email
          </button>
        </div>

        {sent && (
          <p className="mt-4 text-sm text-indigo" role="status">
            Request prepared. If nothing opened, call{" "}
            <a href={`tel:${site.phone}`} className="figure-mono underline">
              {site.phoneDisplay}
            </a>
            .
          </p>
        )}

        <p className="mt-4 text-2xs text-ink-3 leading-relaxed">
          No prices are shown online — every quality is quoted per lot against
          quantity and shade.
        </p>
      </form>
    </div>
  );
}
