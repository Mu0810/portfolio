import Avatar from "./Avatar";
import DownloadCV from "./DownloadCV";
import Nameplate from "./Nameplate";
import { profile } from "@/lib/data";
import styles from "./Masthead.module.css";

/**
 * The front page.
 *
 * A broadsheet opens with the paper's name set as large as the sheet allows,
 * fenced by rules, with the edition line above it — so this does that with
 * Manish's name, at `--step-5` (11.6vw), edge to edge.
 *
 * A server component: only the nameplate needs a client boundary (it reads
 * scroll position), so the portrait probe, the CV link and the vitals table all
 * render on the server.
 *
 * There is no date in the edition line, deliberately. This page is statically
 * prerendered, so a build-time date would freeze at deploy time and a
 * client-time one would mismatch during hydration.
 */
/**
 * Render a handle with a break opportunity in a sensible place.
 *
 * The vitals column is narrow, and `0810sonimanish@gmail.com` was wrapping
 * inside the domain — the page showed `…gmail.co` on one line and a lone `m` on
 * the next, on the single most important string on the site. A `<wbr>` after the
 * `@` gives the browser a break point it prefers over mid-token, so the address
 * stays visible and correct instead of being hidden behind a "Email me" label.
 */
function withBreakPoint(handle: string) {
  const at = handle.indexOf("@");
  if (at === -1) return handle;
  return (
    <>
      {handle.slice(0, at + 1)}
      <wbr />
      {handle.slice(at + 1)}
    </>
  );
}

export default function Masthead() {
  return (
    <header className={styles.masthead}>
      {/* ---------- edition line ---------- */}
      <div className={`${styles.edition} mono`}>
        <span className={styles.editionAccent}>{profile.availability}</span>
        <span className={styles.editionSep} aria-hidden="true" />
        <span>{profile.location}</span>
      </div>

      <Nameplate name={profile.name} />

      {/* Double rule under the nameplate — the standard masthead fence. */}
      <div className={styles.fence} aria-hidden="true">
        <span />
        <span />
      </div>

      {/* ---------- the deck ---------- */}
      <div className={styles.deck}>
        <div className={styles.lead}>
          <h2 className={styles.headline}>
            <span>I build full-stack systems,</span>
            <span>
              and I sweat the parts that <em>fail quietly</em>.
            </span>
          </h2>

          <p className={styles.standfirst}>{profile.tagline}</p>

          {/* One static line of stack keywords, above the fold.
              A recruiter scanning against a req sheet was finding none of these
              words on the first screen — they were only in About prose and in
              the toolkit table further down. Deliberately not a link, not a
              chip, and not animated: it exists to be read in two seconds and to
              match Ctrl-F. */}
          <p className={`${styles.stackLine} mono`}>
            {profile.stack.join("  ·  ")}
          </p>

          <div className={styles.ctas}>
            <DownloadCV />
            <a href="#work" className={styles.ctaQuiet}>
              See the work
            </a>
          </div>
        </div>

        <aside className={styles.plateCol}>
          <Avatar />

          <dl className={styles.vitals}>
            <div className={styles.vital}>
              <dt className={`${styles.vitalKey} mono`}>Studying</dt>
              <dd className={styles.vitalVal}>B.Tech CSE, VIT Bhopal · 2027</dd>
            </div>
            {profile.socials.map((s) => (
              <div className={styles.vital} key={s.label}>
                <dt className={`${styles.vitalKey} mono`}>{s.label}</dt>
                <dd className={styles.vitalVal}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={styles.vitalLink}
                  >
                    {withBreakPoint(s.handle)}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </header>
  );
}
