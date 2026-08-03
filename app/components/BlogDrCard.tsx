"use client";

import { FormEvent, useState } from "react";

function cleanDomain(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
    .replace(/\.+$/, "")
    .toLowerCase();
}

export default function BlogDrCard() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextDomain = cleanDomain(domain);

    if (!nextDomain) {
      setError("Enter a domain first.");
      return;
    }

    window.location.href = `/?domain=${encodeURIComponent(nextDomain)}`;
  }

  return (
    <section className="blog-dr-card" aria-labelledby="blog-dr-card-title">
      <p className="blog-card__meta">Free SEO tool</p>
      <h2 id="blog-dr-card-title">Check Your Domain Rating for Free</h2>
      <p>Run a quick DR check while you read, then compare your site with the guide.</p>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="blogDrDomain">Domain</label>
        <input
          id="blogDrDomain"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="example.com"
          value={domain}
          onChange={(event) => {
            setDomain(event.target.value);
            setError("");
          }}
        />
        <button type="submit">Check DR</button>
      </form>
      {error ? <p className="blog-dr-card__error" role="alert">{error}</p> : null}
    </section>
  );
}
