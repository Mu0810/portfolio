import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Avatar from "@/components/Avatar";
import DownloadCV from "@/components/DownloadCV";
import ContactForm from "@/components/ContactForm";
import ProjectRow from "@/components/ProjectRow";
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

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Nav />
      <main id="top">
        {/* ---------------- Hero ----------------
            Asymmetric: copy in a wide column, portrait and metadata in a
            narrower one separated by a rule. No backdrop effect. */}
        <section className={styles.hero}>
          <div className={styles.heroMain}>
            <p className={`${styles.available} mono`}>{profile.availability}</p>

            <h1 className={styles.title}>
              <span className={styles.titleLine}>I build full-stack systems,</span>
              <span className={styles.titleLine}>
                and I sweat the parts that <em>fail quietly</em>.
              </span>
            </h1>

            <p className={styles.subtitle}>{profile.tagline}</p>

            <div className={styles.heroCtas}>
              <DownloadCV />
              <a href="#work" className={styles.btnQuiet}>
                See the work
              </a>
            </div>
          </div>

          <aside className={styles.heroAside}>
            <Avatar />

            <dl className={styles.vitals}>
              <div className={styles.vital}>
                <dt className={`${styles.vitalKey} mono`}>Name</dt>
                <dd className={styles.vitalVal}>{profile.name}</dd>
              </div>
              <div className={styles.vital}>
                <dt className={`${styles.vitalKey} mono`}>Based in</dt>
                <dd className={styles.vitalVal}>{profile.location}</dd>
              </div>
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
                      {s.handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        {/* ---------------- Numbers ----------------
            A rule-separated strip, not a grid of cards with big gradient
            figures. Each number is a claim you can go and check. */}
        <section className={styles.figures} aria-label="Selected metrics">
          <div className={styles.figuresInner}>
            {stats.map((stat) => (
              <div className={styles.figure} key={stat.label}>
                <span className={`${styles.figureValue} mono`}>{stat.value}</span>
                <span className={styles.figureLabel}>{stat.label}</span>
                <span className={styles.figureDetail}>{stat.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className={styles.section}>
          <div className={styles.twoCol}>
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>01</span>
              <h2 className={styles.sectionTitle}>About</h2>
            </Reveal>
            <div className={styles.prose}>
              {about.map((para, i) => (
                <Reveal key={i} delay={i * 70} as="p">
                  {para}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Work ---------------- */}
        <section id="work" className={styles.section}>
          <div className={styles.twoCol}>
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>02</span>
              <h2 className={styles.sectionTitle}>Selected work</h2>
              <p className={styles.colNote}>
                Each one has a detail I would happily be quizzed on.
              </p>
            </Reveal>

            <div>
              <ol className={styles.index}>
                {featured.map((project, i) => (
                  <ProjectRow key={project.title} project={project} index={i} />
                ))}
              </ol>
              <Link href="/projects" className={styles.more}>
                Full index — all {projects.length} projects
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- Toolkit ---------------- */}
        <section id="skills" className={styles.section}>
          <div className={styles.twoCol}>
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>03</span>
              <h2 className={styles.sectionTitle}>Toolkit</h2>
              <p className={styles.colNote}>
                Everything here appears in a repository you can open.
              </p>
            </Reveal>

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
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>04</span>
              <h2 className={styles.sectionTitle}>How I work</h2>
              <p className={styles.colNote}>Four habits, each with a scar.</p>
            </Reveal>

            <div className={styles.habits}>
              {principles.map((item, i) => (
                <Reveal key={item.title} delay={i * 60} className={styles.habit}>
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
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>05</span>
              <h2 className={styles.sectionTitle}>Education</h2>
            </Reveal>

            <div>
              {education.map((entry) => (
                <Reveal key={entry.institution} className={styles.eduRow}>
                  <div className={styles.eduHead}>
                    <h3 className={styles.eduDegree}>{entry.degree}</h3>
                    <span className={`${styles.eduPeriod} mono`}>{entry.period}</span>
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
            <Reveal className={styles.colLabel}>
              <span className={`${styles.sectionNo} mono`}>06</span>
              <h2 className={styles.sectionTitle}>Contact</h2>
            </Reveal>

            <div className={styles.contactBody}>
              <p className={styles.contactLede}>
                I&apos;m looking for a new-grad software engineering role or an
                internship for 2027. Write below, or email me directly — I reply to
                everything.
              </p>

              <div className={styles.contactActions}>
                <a href={`mailto:${profile.email}`} className={`${styles.mailto} mono`}>
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
