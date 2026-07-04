import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import styles from "./page.module.css";
import {
  profile,
  stats,
  about,
  skillGroups,
  projects,
  experience,
} from "@/lib/data";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Nav />
      <main id="top" className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={`${styles.eyebrow} mono`}>
              <span className={styles.status} /> Available for new work
            </p>
            <h1 className={styles.title}>
              Hi, I&apos;m {profile.firstName}. I build{" "}
              <span className={styles.gradient}>AI-powered software</span> for
              the web.
            </h1>
            <p className={styles.subtitle}>{profile.tagline}</p>

            <div className={styles.heroCtas}>
              <a href="#work" className={styles.btnPrimary}>
                View my work
              </a>
              <a href="#contact" className={styles.btnGhost}>
                Get in touch
              </a>
            </div>

            <div className={styles.socials}>
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.scrollHint} aria-hidden="true">
            <span className={styles.mouse} />
            Scroll
          </div>
        </section>

        {/* Stats */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className={styles.section}>
          <Reveal>
            <p className={`${styles.kicker} mono`}>01 — About</p>
            <h2 className={styles.sectionTitle}>
              Engineer, designer at heart.
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

        {/* Skills */}
        <section id="skills" className={styles.section}>
          <Reveal>
            <p className={`${styles.kicker} mono`}>02 — Skills</p>
            <h2 className={styles.sectionTitle}>Tools I reach for.</h2>
          </Reveal>
          <div className={styles.skillsGrid}>
            {skillGroups.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 100}
                className={styles.skillCard}
              >
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

        {/* Work */}
        <section id="work" className={styles.section}>
          <Reveal>
            <p className={`${styles.kicker} mono`}>03 — Selected Work</p>
            <h2 className={styles.sectionTitle}>Things I&apos;ve built.</h2>
          </Reveal>
          <div className={styles.projectsGrid}>
            {projects.map((project, i) => (
              <Reveal
                key={project.title}
                delay={(i % 2) * 90}
                className={`${styles.projectCard} ${
                  project.featured ? styles.featured : ""
                }`}
              >
                <a
                  href={project.href}
                  className={styles.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.projectTop}>
                    <span className={`${styles.projectYear} mono`}>
                      {project.year}
                    </span>
                    <span className={styles.projectArrow} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <ul className={styles.tagList}>
                    {project.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className={styles.section}>
          <Reveal>
            <p className={`${styles.kicker} mono`}>04 — Experience</p>
            <h2 className={styles.sectionTitle}>Where I&apos;ve worked.</h2>
          </Reveal>
          <div className={styles.timeline}>
            {experience.map((job, i) => (
              <Reveal
                key={`${job.company}-${i}`}
                delay={i * 80}
                className={styles.timelineItem}
              >
                <div className={styles.timelineMarker} aria-hidden="true" />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHead}>
                    <h3 className={styles.jobRole}>{job.role}</h3>
                    <span className={`${styles.jobPeriod} mono`}>
                      {job.period}
                    </span>
                  </div>
                  <p className={styles.jobCompany}>{job.company}</p>
                  <p className={styles.jobDesc}>{job.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.contact}>
          <Reveal className={styles.contactInner}>
            <p className={`${styles.kicker} mono`}>05 — Contact</p>
            <h2 className={styles.contactTitle}>
              Let&apos;s build something great.
            </h2>
            <p className={styles.contactText}>
              Have a project in mind, a role to fill, or just want to say hello?
              My inbox is always open.
            </p>
            <a href={`mailto:${profile.email}`} className={styles.emailBtn}>
              {profile.email}
            </a>
            <div className={styles.socials}>
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © {year} {profile.name}
        </span>
        <span className={styles.footerNote}>
          Built with Next.js · Designed &amp; coded with care
        </span>
      </footer>
    </>
  );
}
