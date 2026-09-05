"use client";

import { useEffect, useState } from "react";

export function ShareButtons() {
  const [url, setUrl] = useState("");
  useEffect(() => { setUrl(window.location.href); }, []);

  if (!url) return null;

  const encoded = encodeURIComponent(url);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encoded}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
  ];

  return (
    <div className="flex items-center gap-4 border-t border-rule pt-6 mt-6">
      <span className="label-caps text-ink-3">Share</span>
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ink-2 hover:text-indigo transition-colors border-b border-ink-3/30 hover:border-indigo pb-px"
        >
          {label}
        </a>
      ))}
    </div>
  );
}
