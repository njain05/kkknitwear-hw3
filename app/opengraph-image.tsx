import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

const PAPER = "#FAF8F4";
const INK = "#14161A";
const INDIGO = "#2A3A6B";

/**
 * Satori requires an explicit display on every element with more than one
 * child, and does not lay out <br>. Each line is therefore its own element.
 */
export default function OpengraphImage() {
  const leaves = [
    { c: INDIGO, h: "84%" },
    { c: "#8C9BC4", h: "100%" },
    { c: "#1B2748", h: "91%" },
    { c: "#B4654A", h: "76%" },
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 4, color: INDIGO }}>
              {`KNITTED FABRIC MANUFACTURER · ${site.address.city.toUpperCase()}`}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 28,
                fontSize: 78,
                fontWeight: 700,
                color: INK,
                letterSpacing: -2,
              }}
            >
              <div style={{ lineHeight: 1.04 }}>Mill-direct</div>
              <div style={{ lineHeight: 1.04 }}>knitted fabric.</div>
            </div>
            <div style={{ fontSize: 30, color: "#3D4148", marginTop: 26 }}>
              Small lots, quick turnaround.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 22, color: INK }}>
            <div style={{ fontWeight: 700 }}>K.K Knitwear Club</div>
            <div style={{ color: "#6B7078", margin: "0 16px" }}>·</div>
            <div style={{ color: "#6B7078" }}>{`Est. ${site.established}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", width: 380 }}>
          {leaves.map((leaf, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flex: 1,
                height: leaf.h,
                background: leaf.c,
                marginRight: i === leaves.length - 1 ? 0 : 4,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
