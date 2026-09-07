import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

/**
 * The Open Graph card, generated at build time.
 *
 * Twitter/X reuses this: with `twitter.card = "summary_large_image"` declared in
 * the layout and no `twitter-image` file present, Next resolves twitter:image
 * from the Open Graph image. Before this file existed the site advertised a
 * large-image card and then supplied no image, so every shared link rendered as
 * bare text.
 *
 * Satori (what ImageResponse runs on) supports flexbox and a subset of CSS —
 * no grid, no custom properties — so the palette below is the resolved dark
 * theme from globals.css rather than a var() reference.
 */
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Resolved from html[data-theme="dark"] in globals.css.
const PAPER = "#100f0d";
const INK = "#f2efe7";
const INK_2 = "#b0aa9e";
const RULE = "#2a2721";
const ACCENT = "#e2703a";

/**
 * Fetch a Google-hosted TTF for Satori.
 *
 * The version segment in gstatic URLs changes when a family is republished, so
 * the URL is discovered from the CSS endpoint rather than pinned. Any failure
 * returns null and the card renders in ImageResponse's bundled font — a
 * missing typeface must not fail the build.
 */
async function loadFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
      // A plain UA gets the TTF sources; a modern one gets woff2, which
      // Satori cannot parse.
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => (r.ok ? r.text() : ""));

    const url = css.match(/https:\/\/[^)]+\.ttf/)?.[0];
    if (!url) return null;

    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [serif, mono] = await Promise.all([
    loadFont("Instrument+Serif"),
    loadFont("JetBrains+Mono:wght@400"),
  ]);

  const fonts = [
    ...(serif
      ? [
          {
            name: "Instrument Serif",
            data: serif,
            weight: 400 as const,
            style: "normal" as const,
          },
        ]
      : []),
    ...(mono
      ? [
          {
            name: "JetBrains Mono",
            data: mono,
            weight: 400 as const,
            style: "normal" as const,
          },
        ]
      : []),
  ];

  const display = serif ? "Instrument Serif" : "serif";
  const label = mono ? "JetBrains Mono" : "monospace";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PAPER,
        padding: "68px 76px",
      }}
    >
      {/* Masthead rule — the same hairline structure the site uses. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: label,
              fontSize: 22,
              letterSpacing: "0.22em",
              color: ACCENT,
              textTransform: "uppercase",
            }}
          >
            {profile.availability}
          </div>
          <div
            style={{
              fontFamily: label,
              fontSize: 21,
              letterSpacing: "0.14em",
              color: INK_2,
            }}
          >
            @Mu0810
          </div>
        </div>
        <div style={{ display: "flex", height: 1, backgroundColor: RULE }} />
      </div>

      {/* Name, set large in the display serif. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: display,
            fontSize: 116,
            lineHeight: 1.02,
            color: INK,
            letterSpacing: "-0.015em",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            marginTop: 26,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 3,
              backgroundColor: ACCENT,
            }}
          />
          <div
            style={{
              fontFamily: display,
              fontSize: 44,
              color: INK_2,
            }}
          >
            {profile.role}
          </div>
        </div>
      </div>

      {/* Footer: the claim the site is actually about. */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            height: 1,
            backgroundColor: RULE,
            marginBottom: 22,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: display,
              fontSize: 34,
              color: INK,
              maxWidth: 780,
              lineHeight: 1.28,
            }}
          >
            I build full-stack systems, and I sweat the parts that fail quietly.
          </div>
          <div
            style={{
              fontFamily: label,
              fontSize: 20,
              letterSpacing: "0.1em",
              color: INK_2,
            }}
          >
            {profile.location.split(",")[0].toUpperCase()}
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
