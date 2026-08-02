export function normalizeDomain(value: string | null | undefined) {
  let input = String(value || "").trim().toLowerCase();

  if (!input) {
    return "";
  }

  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  try {
    const url = new URL(input);
    input = url.hostname;
  } catch {
    input = input.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "").split(/[/?#]/)[0];
  }

  return input
    .replace(/^www\./i, "")
    .replace(/\.+$/, "")
    .toLowerCase();
}

export function isValidDomain(domain: string) {
  if (!domain || domain.length > 253 || domain.includes("..")) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))
    && /^[a-z]{2,63}$/.test(labels.at(-1) || "");
}

export function parseDomainInput(value: unknown, limit: number) {
  const rawValues = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\n,;\s]+/)
      : [];

  const domains = Array.from(
    new Set(
      rawValues
        .map((item) => normalizeDomain(String(item)))
        .filter(Boolean)
    )
  );

  const invalid = domains.filter((domain) => !isValidDomain(domain));
  const valid = domains.filter(isValidDomain);

  return {
    domains: valid.slice(0, limit),
    invalid,
    totalValid: valid.length,
    truncated: valid.length > limit
  };
}
