import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Aurora from "@/components/Aurora";
import Avatar from "@/components/Avatar";
import DownloadCV from "@/components/DownloadCV";
import ContactForm from "@/components/ContactForm";
import ProjectCard from "@/components/ProjectCard";
import Socials from "@/components/Socials";
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

const MARQUEE = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Python",
  "FastAPI",
  "Docker",
  "Three.js",
  "WebGL",
  "GLSL",
  "Redis",
  "Stripe",
  "Vitest",
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Nav />
      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className={styles.hero}>
          <Aurora />

          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <p className={`${styles.eyebrow} mono`}>
                <span className={styles.status} aria-hidden="true" />
                {profile.availability}
              </p>

              <h1 className={styles.title}>
                <span className={styles.name}>{profile.name}</span>
                I build full-stack systems, and I sweat the parts that{" "}
                <span className={styles.gradient}>fail quietly</span>.
              </h1>

              <p className={styles.subtitle}>{profile.tagline}</p>

              <div className={styles.heroCtas}>
                <DownloadCV />
                <a href="#work" className={styles.btnGhost}>
                  See the work
                </a>
              </div>

              <Socials className={styles.heroSocials} />
            </div>

            <div className={styles.heroPortrait}>
              <Avatar />
            </div>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <span className={styles.mouse} />
            <span className="mono">scroll</span>
          </div>
        </section>

        {/* ---------------- Marquee ---------------- */}
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copy) => (
              <ul key={copy} className={styles.marqueeList}>
                {MARQUEE.map((item) => (
                  <li key={`${copy}-${item}`}>
                    {item}
                    <span className={styles.marqueeSep}>◆</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ---------------- Numbers ---------------- */}
        <section className={styles.statsSection} aria-label="Selected metrics">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statDetail}>{stat.detail}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className={styles.section}>
          <Reveal className={styles.sectionHead}>
            <p className={`${styles.kicker} mono`}>01 — About</p>
            <h2 className={styles.sectionTitle}>
              Final year, and a long list of things I broke first.
            </h2>
          </Reveal>
          <div className={styles.aboutBody}>
            {about.map((para, i) => (
              <Reveal key={i} delay={i * 80} as="p">
                {para}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Work ---------------- */}
        <section id="work" className={styles.section}>
          <Reveal className={styles.sectionHead}>
            <p className={`${styles.kicker} mono`}>02 — Selected work</p>
            <h2 className={styles.sectionTitle}>Four projects worth opening.</h2>
            <p className={styles.sectionLede}>
              Each of these has one detail I would happily be quizzed on.
            </p>
          </Reveal>

          <div className={styles.projectsGrid}>
            {featured.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={(i % 2) * 90} />
            ))}
          </div>

          <Reveal className={styles.viewAllWrap}>
            <Link href="/projects" className={styles.viewAll}>
              All {projects.length} projects
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className={styles.section}>
          <Reveal className={styles.sectionHead}>
            <p className={`${styles.kicker} mono`}>03 — Toolkit</p>
            <h2 className={styles.sectionTitle}>What I actually reach for.</h2>
            <p className={styles.sectionLede}>
              Everything here appears in a repository you can open.
            </p>
          </Reveal>

          <div className={styles.skillsGrid}>
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 70} className={styles.skillCard}>
                <h3 className={styles.skillTitle}>{group.title}</h3>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.chip}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Principles ---------------- */}
        <section id="principles" className={styles.section}>
          <Reveal className={styles.sectionHead}>
            <p className={`${styles.kicker} mono`}>04 — How I work</p>
            <h2 className={styles.sectionTitle}>Four habits, each with a scar.</h2>
          </Reveal>

          <div className={styles.principlesGrid}>
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className={styles.principle}>
                <span className={`${styles.principleNum} mono`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleBody}>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Education ---------------- */}
        <section id="education" className={styles.section}>
          <Reveal className={styles.sectionHead}>
            <p className={`${styles.kicker} mono`}>05 — Education</p>
            <h2 className={styles.sectionTitle}>Where I&apos;m studying.</h2>
          </Reveal>

          <div className={styles.timeline}>
            {education.map((entry, i) => (
              <Reveal
                key={entry.institution}
                delay={i * 80}
                className={styles.timelineItem}
              >
                <div className={styles.timelineMarker} aria-hidden="true" />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHead}>
                    <h3 className={styles.degree}>{entry.degree}</h3>
                    <span className={`${styles.period} mono`}>{entry.period}</span>
                  </div>
                  <p className={styles.institution}>{entry.institution}</p>
                  <p className={styles.eduDetail}>{entry.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className={styles.contact}>
          <Reveal className={styles.contactInner}>
            <p className={`${styles.kicker} mono`}>06 — Contact</p>
            <h2 className={styles.contactTitle}>
              Hiring for 2027? Let&apos;s talk.
            </h2>
            <p className={styles.contactText}>
              I&apos;m looking for a new-grad software engineering role or an internship.
              Send a message below, or email me directly — I reply to everything.
            </p>

            <div className={styles.contactActions}>
              <DownloadCV />
              <a href={`mailto:${profile.email}`} className={styles.emailBtn}>
                {profile.email}
              </a>
            </div>

            <ContactForm />
            <Socials className={styles.contactSocials} />
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
