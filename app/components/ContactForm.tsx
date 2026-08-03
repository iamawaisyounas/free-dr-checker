"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

type SubmitState = "idle" | "sending" | "sent" | "error";

type ContactFields = {
  name: string;
  subject: string;
  email: string;
  help: string;
  website: string;
};

const initialFields: ContactFields = {
  name: "",
  subject: "",
  email: "",
  help: "",
  website: ""
};

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [pendingVerification, setPendingVerification] = useState(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    setPendingVerification(false);
    setTurnstileResetKey((key) => key + 1);
  }, []);

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));

    if (turnstileToken || pendingVerification) {
      resetTurnstile();
    }

    if (status === "sent") {
      setStatus("idle");
      setMessage("");
    }
  }

  function getValidationMessage() {
    if (!fields.name.trim() || !fields.subject.trim() || !fields.email.trim() || !fields.help.trim()) {
      return "Please fill in all contact form fields.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  const sendMessage = useCallback(async (token: string) => {
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          subject: fields.subject,
          email: fields.email,
          message: fields.help,
          website: fields.website,
          turnstileToken: token
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.error || "Unable to send your message right now.");
        return;
      }

      setFields(initialFields);
      setShowTurnstile(false);
      resetTurnstile();
      setStatus("sent");
      setMessage("Thanks. Your message has been sent.");
    } catch {
      setStatus("error");
      setMessage("Unable to send your message right now.");
    }
  }, [fields, resetTurnstile]);

  const handleTurnstileError = useCallback(() => {
    setStatus("error");
    setMessage("Bot protection failed to load. Refresh the page and try again.");
  }, []);

  const handleTurnstileTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  useEffect(() => {
    if (pendingVerification && turnstileToken && status !== "sending") {
      setPendingVerification(false);
      void sendMessage(turnstileToken);
    }
  }, [pendingVerification, sendMessage, status, turnstileToken]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = getValidationMessage();
    if (validationMessage) {
      setStatus("error");
      setMessage(validationMessage);
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setShowTurnstile(true);
      setPendingVerification(true);
      setStatus("idle");
      setMessage("Please complete the bot protection check to send your message.");
      return;
    }

    await sendMessage(turnstileToken);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>Name<input name="name" type="text" autoComplete="name" value={fields.name} onChange={handleFieldChange} required /></label>
      <label>Subject<input name="subject" type="text" autoComplete="off" value={fields.subject} onChange={handleFieldChange} required /></label>
      <label>Email Address<input name="email" type="email" autoComplete="email" value={fields.email} onChange={handleFieldChange} required /></label>
      <label>How we can help?<textarea name="help" rows={6} value={fields.help} onChange={handleFieldChange} required></textarea></label>
      <label className="contact-form__trap">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={handleFieldChange} /></label>
      {showTurnstile ? (
        <TurnstileWidget
          disabled={status === "sending"}
          resetKey={turnstileResetKey}
          siteKey={turnstileSiteKey}
          onError={handleTurnstileError}
          onTokenChange={handleTurnstileTokenChange}
        />
      ) : null}
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send a message"}
      </button>
      {message ? (
        <p className={`contact-form-status${status === "sent" ? " is-success" : ""}`} role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </form>
  );
}
