import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Masthead from "@/components/Masthead";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNo from "@/components/SectionNo";
import FlipStat from "@/components/FlipStat";
import WorkGallery from "@/components/WorkGallery";
import DownloadCV from "@/components/DownloadCV";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import {
  profile,
  stats,
  about,
  skillGroups,
  projects,
  education,
  principles,
} from "@/lib/data";

/**
 * The kinetic broadsheet.
 *
 * Same editorial constraints as before — warm paper and ink, one accent, hairline
 * rules, no gradients, no glows, no cards floating on shadows. What is new is
 * that the sheet moves: the nameplate parallaxes, folio numerals counter-scroll,
 * the work section turns sideways under scroll, the toolkit runs as headlines,
 * and the figures land like a split-flap board.
 *
 * Every one of those is gated on `prefers-reduced-motion` and collapses to the
 * static editorial layout, which is the honest fallback rather than a lesser one.
 */
export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <ScrollProgress />
      <Nav />

      <main id="top">
        <Masthead />

        {/* ---------------- Figures ----------------
            A rule-separated strip. Each number is a claim you can go and check;
            each one lands like a flap board when it scrolls into view. */}
        <section className={styles.figures} aria-label="Selected metrics">
          <div className={styles.figuresInner}>
            {stats.map((stat) => (
              <div className={styles.figure} key={stat.label}>
                <FlipStat value={stat.value} />
                <span className={styles.figureLabel}>{stat.label}</span>
                <span className={styles.figureDetail}>{stat.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className={styles.section}>
          <div className={styles.twoCol}>
            <div className={styles.colLabel}>
              <SectionNo no="01" />
              <h2 className={styles.sectionTitle}>About</h2>
            </div>
            <div className={styles.prose}>
              {about.map((para, i) => (
                <Reveal key={i} delay={i * 70} as="p">
                  {para}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Work ----------------
            The centrepiece. Full-bleed, because a spread that stops at the text
            measure is not a spread. The heading stays in the normal column so
            the section is still announced and linkable as one. */}
        <section id="work" className={styles.workSection}>
          <div className={styles.workHead}>
            <div className={styles.workHeadInner}>
              <div className={styles.colLabel}>
                <SectionNo no="02" />
                <h2 className={styles.sectionTitle}>Selected work</h2>
              </div>
              <p className={styles.workNote}>
                Each one has a detail I would happily be quizzed on. Four spreads —
                the arrows turn the page.
              </p>
            </div>
          </div>

          <WorkGallery projects={featured} no="02" label="Selected work" />

          <div className={styles.workFoot}>
            <Link href="/projects" className={styles.more}>
              Full index — all {projects.length} projects
            </Link>
          </div>
        </section>

        {/* ---------------- Toolkit ----------------
            Static, deliberately. This was a set of horizontal marquees, and the
            motion broke the only task the section exists for: a recruiter
            checking whether one specific word is on the list. Worse, the pause
            control only appeared on hover, so a touch user could not stop it at
            all — a WCAG 2.2.2 failure. Reference content holds still; the
            kinetic budget is spent on the masthead, the folios and the work
            gallery instead. */}
        <section id="skills" className={styles.section}>
          <div className={styles.twoCol}>
            <div className={styles.colLabel}>
              <SectionNo no="03" />
              <h2 className={styles.sectionTitle}>Toolkit</h2>
              <p className={styles.colNote}>
                Everything here appears in a repository you can open.
              </p>
            </div>

            <dl className={styles.tools}>
              {skillGroups.map((group, i) => (
                <Reveal key={group.title} delay={i * 55} className={styles.toolRow}>
                  <dt className={`${styles.toolKey} mono`}>{group.title}</dt>
                  <dd className={styles.toolVal}>{group.items.join("  ·  ")}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------- How I work ---------------- */}
        <section id="principles" className={styles.section}>
          <div className={styles.twoCol}>
            <div className={styles.colLabel}>
              <SectionNo no="04" />
              <h2 className={styles.sectionTitle}>How I work</h2>
              <p className={styles.colNote}>Four habits, each with a scar.</p>
            </div>

            <div className={styles.habits}>
              {principles.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={i * 60}
                  className={styles.habit}
                >
                  <h3 className={styles.habitTitle}>{item.title}</h3>
                  <p className={styles.habitBody}>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Education ---------------- */}
        <section id="education" className={styles.section}>
          <div className={styles.twoCol}>
            <div className={styles.colLabel}>
              <SectionNo no="05" />
              <h2 className={styles.sectionTitle}>Education</h2>
            </div>

            <div>
              {education.map((entry) => (
                <Reveal key={entry.institution} className={styles.eduRow}>
                  <div className={styles.eduHead}>
                    <h3 className={styles.eduDegree}>{entry.degree}</h3>
                    <span className={`${styles.eduPeriod} mono`}>
                      {entry.period}
                    </span>
                  </div>
                  <p className={styles.eduInst}>{entry.institution}</p>
                  <p className={styles.eduDetail}>{entry.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className={styles.contact}>
          <div className={styles.twoCol}>
            <div className={styles.colLabel}>
              <SectionNo no="06" />
              <h2 className={styles.sectionTitle}>Contact</h2>
            </div>

            <div className={styles.contactBody}>
              <p className={styles.contactLede}>
                I&apos;m looking for a new-grad software engineering role or an
                internship for 2027. Write below, or email me directly — I reply
                to everything.
              </p>

              <div className={styles.contactActions}>
                <a
                  href={`mailto:${profile.email}`}
                  className={`${styles.mailto} mono`}
                >
                  {profile.email}
                </a>
                <DownloadCV variant="quiet" />
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
