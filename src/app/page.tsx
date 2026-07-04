import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
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
  experience,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={`${styles.eyebrow} mono`}>
              <span className={styles.status} /> Available for new work
              {profile.location ? ` · ${profile.location}` : ""}
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

            <Socials />
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
              <ProjectCard
                key={project.title}
                project={project}
                delay={(i % 2) * 90}
              />
            ))}
          </div>
          <Reveal className={styles.viewAllWrap}>
            <Link href="/projects" className={styles.viewAll}>
              View all projects →
            </Link>
          </Reveal>
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
              Drop me a message below — or email me directly.
            </p>
            <ContactForm />
            <a href={`mailto:${profile.email}`} className={styles.emailBtn}>
              {profile.email}
            </a>
            <Socials />
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
