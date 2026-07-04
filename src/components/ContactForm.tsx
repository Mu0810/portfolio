"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import { profile } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showMailto, setShowMailto] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setShowMailto(false);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setError(
        result?.message ||
          result?.error ||
          "Could not send your message. Please try again."
      );
      // If the email service isn't configured, offer a direct mailto fallback.
      if (res.status === 503) setShowMailto(true);
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
      setShowMailto(true);
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.checkmark} aria-hidden="true">
          ✓
        </span>
        <h3 className={styles.successTitle}>Message sent!</h3>
        <p className={styles.successText}>
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          className={styles.reset}
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project or just say hello…"
          className={styles.textarea}
        />
      </div>

      {status === "error" && error ? (
        <p className={styles.errorMsg} role="alert">
          {error}
          {showMailto ? (
            <>
              {" "}
              <a href={`mailto:${profile.email}`} className={styles.mailtoLink}>
                Email me directly →
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      <button
        type="submit"
        className={styles.submit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
