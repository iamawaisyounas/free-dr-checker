"use client";

import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          message: String(formData.get("message") || ""),
          website: String(formData.get("website") || "")
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.error || "Unable to send your message right now.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage("Thanks. Your message has been sent.");
    } catch {
      setStatus("error");
      setMessage("Unable to send your message right now.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>Name<input name="name" type="text" autoComplete="name" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Message<textarea name="message" rows={6} required></textarea></label>
      <label className="contact-form__trap">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Submit"}</button>
      {message ? (
        <p className={`contact-form-status${status === "sent" ? " is-success" : ""}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
