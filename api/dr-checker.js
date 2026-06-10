function json(res, status, payload) {
  res.status(status).json(payload);
}

function normalizeDomain(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
    .replace(/\.+$/, "")
    .toLowerCase();
}

function isValidDomain(domain) {
  if (!domain || domain.length > 253 || domain.includes("..")) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    return false;
  }

  return labels.every((label) => {
    return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label);
  }) && /^[a-z]{2,63}$/.test(labels.at(-1));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("allow", "GET");
    return json(res, 405, { error: "Method not allowed." });
  }

  const domain = normalizeDomain(req.query.domain);

  if (!domain) {
    return json(res, 400, { error: "Please enter a domain." });
  }

  if (!isValidDomain(domain)) {
    return json(res, 400, { error: "Please enter a valid website address." });
  }

  try {
    const apiUrl = new URL("https://api.ahrefs.com/v3/public/domain-rating-free");
    apiUrl.searchParams.set("target", domain);
    apiUrl.searchParams.set("output", "json");

    const response = await fetch(apiUrl, {
      headers: {
        accept: "application/json",
        "user-agent": "FreeDRChecker/1.0"
      }
    });

    if (!response.ok) {
      return json(res, response.status >= 500 ? 502 : response.status, {
        error: "Unable to fetch Domain Rating."
      });
    }

    const data = await response.json();
    const dr = data?.domain_rating?.domain_rating;

    if (typeof dr !== "number") {
      return json(res, 502, { error: "Unable to fetch Domain Rating." });
    }

    return json(res, 200, {
      domain,
      dr: Math.round(dr)
    });
  } catch {
    return json(res, 502, { error: "Unable to fetch Domain Rating." });
  }
}
