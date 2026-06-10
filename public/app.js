const form = document.querySelector("#checkerForm");
const input = document.querySelector("#domainInput");
const errorText = document.querySelector("#errorText");
const loadingState = document.querySelector("#loadingState");
const submitButton = document.querySelector("#submitButton");
const resultsSection = document.querySelector("#resultsSection");
const progressCircle = document.querySelector("#progressCircle");
const drScore = document.querySelector("#drScore");
const resultDomain = document.querySelector("#resultDomain");
const resultDr = document.querySelector("#resultDr");
const resultStatus = document.querySelector("#resultStatus");
const interpretationText = document.querySelector("#interpretationText");

function cleanDomain(value) {
  return value
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

function getStatus(score) {
  if (score <= 10) return "Very Low";
  if (score <= 30) return "Low";
  if (score <= 50) return "Average";
  if (score <= 70) return "Strong";
  if (score <= 90) return "Very Strong";
  return "Elite";
}

function getInterpretation(domain, score, status) {
  const descriptions = {
    "Very Low": `${domain} has a very low Domain Rating. This usually means the site has a limited backlink profile or is still new.`,
    Low: `${domain} has a low Domain Rating. It may have some backlinks, but there is room to build more authority.`,
    Average: `${domain} has an average Domain Rating. The backlink profile has some strength, but stronger competitors may still have an advantage.`,
    Strong: `${domain} has a strong Domain Rating. This usually points to a solid backlink profile and good authority signals.`,
    "Very Strong": `${domain} has a very strong Domain Rating. Sites in this range often have many quality referring domains.`,
    Elite: `${domain} has an elite Domain Rating. This is usually reserved for domains with exceptionally strong backlink profiles.`
  };

  return descriptions[status] || `${domain} has a Domain Rating of ${score}.`;
}

function setLoading(isLoading) {
  loadingState.hidden = !isLoading;
  submitButton.disabled = isLoading;
  input.disabled = isLoading;
}

function showError(message) {
  errorText.textContent = message;
}

function renderResult(domain, dr) {
  const score = Math.max(0, Math.min(100, Number(dr) || 0));
  const status = getStatus(score);

  resultsSection.hidden = false;
  progressCircle.style.setProperty("--score", score);
  drScore.textContent = score;
  resultDomain.textContent = domain;
  resultDr.textContent = score;
  resultStatus.textContent = status;
  interpretationText.textContent = getInterpretation(domain, score, status);
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");

  const domain = cleanDomain(input.value);

  if (!domain) {
    showError("Please enter a domain.");
    return;
  }

  if (!isValidDomain(domain)) {
    showError("Please enter a valid website address.");
    return;
  }

  input.value = domain;
  setLoading(true);

  try {
    const response = await fetch(`/api/dr-checker?domain=${encodeURIComponent(domain)}`);
    const data = await response.json();

    if (!response.ok) {
      showError(data?.error || "Unable to fetch Domain Rating. Try again later.");
      return;
    }

    renderResult(data.domain, data.dr);
  } catch {
    showError("Unable to fetch Domain Rating. Try again later.");
  } finally {
    setLoading(false);
  }
});
