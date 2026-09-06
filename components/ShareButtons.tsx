"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function ShareButtons({ productName }: { productName?: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encoded = encodeURIComponent(url);
  const waText = productName
    ? encodeURIComponent(`Hi, I'd like to enquire about ${productName}: ${url}`)
    : encodeURIComponent(`Check out this fabric: ${url}`);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select a temporary input
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="border-t border-rule pt-6 mt-6">
      <p className="label-caps text-ink-3 mb-3">Share this fabric</p>
      <div className="flex flex-wrap gap-2">
        {/* Copy link */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-rule text-ink-2 hover:border-indigo hover:text-indigo transition-colors"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M11 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Copy link
            </>
          )}
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-rule text-ink-2 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M13.6 2.4A7.93 7.93 0 0 0 8 0C3.58 0 0 3.58 0 8c0 1.41.37 2.79 1.07 4L0 16l4.13-1.08A7.96 7.96 0 0 0 8 16c4.42 0 8-3.58 8-8 0-2.14-.83-4.15-2.4-5.6zM8 14.67a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.45.64.65-2.39-.16-.25A6.62 6.62 0 0 1 1.33 8C1.33 4.32 4.32 1.33 8 1.33S14.67 4.32 14.67 8 11.68 14.67 8 14.67zm3.63-4.96c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99a6 6 0 0 1-1.1-1.38c-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.33.05-.51.25-.17.2-.67.65-.67 1.59s.69 1.84.78 1.97c.1.13 1.36 2.08 3.3 2.91.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.14-.47 1.3-.92.16-.45.16-.84.11-.92-.05-.08-.18-.13-.38-.23z"/>
          </svg>
          WhatsApp
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-rule text-ink-2 hover:border-[#1877F2] hover:text-[#1877F2] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M16 8.05C16 3.6 12.42 0 8 0S0 3.6 0 8.05c0 4.02 2.93 7.35 6.75 7.95v-5.62H4.72V8.05h2.03V6.28c0-2.02 1.2-3.13 3.02-3.13.88 0 1.79.16 1.79.16v1.98h-1.01c-1 0-1.3.62-1.3 1.26v1.5h2.22l-.35 2.33H9.25V16c3.82-.6 6.75-3.93 6.75-7.95z"/>
          </svg>
          Facebook
        </a>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-rule text-ink-2 hover:border-ink hover:text-ink transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M8.28 5.93 13.47 0h-1.23L7.72 5.15 3.9 0H0l5.45 7.93L0 14h1.23l4.77-5.55L9.83 14H14L8.28 5.93zM6.64 7.66l-.55-.79L1.68.93h1.89l3.55 5.08.55.79 4.61 6.6h-1.9L6.64 7.66z"/>
          </svg>
          X
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-rule text-ink-2 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M0 1.15C0 .51.53 0 1.18 0h13.64C15.47 0 16 .51 16 1.15v13.7c0 .64-.53 1.15-1.18 1.15H1.18C.53 16 0 15.49 0 14.85V1.15zM4.94 13.4V6.17H2.5V13.4h2.44zM3.72 5.16a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84zm9.68 8.24V9.4c0-2.13-.46-3.77-2.95-3.77-1.2 0-2 .66-2.33 1.28h-.03V6.17H5.7V13.4h2.43V9.82c0-1.03.2-2.03 1.47-2.03 1.26 0 1.28 1.18 1.28 2.1V13.4h2.52z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}
