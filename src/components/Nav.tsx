"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import DownloadCV from "./DownloadCV";
import styles from "./Nav.module.css";
import { profile } from "@/lib/data";

const links = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "All projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        // Return focus to the toggle so it never lands on an inert element.
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand} aria-label="Home">
          <span className={styles.brandDot} />
          {profile.firstName}
          <span className={styles.brandAccent}>.</span>
        </Link>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <DownloadCV variant="quiet" className={styles.navCv} />
          <ThemeToggle />
          <button
            ref={menuBtnRef}
            className={styles.menuBtn}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.bar} ${open ? styles.barOpen1 : ""}`} />
            <span className={`${styles.bar} ${open ? styles.barOpen2 : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}
        inert={!open}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <DownloadCV variant="quiet" className={styles.mobileCv} />
      </div>
    </header>
  );
}
