const form = document.querySelector("#checkerForm");
const input = document.querySelector("#domainInput");
const errorText = document.querySelector("#errorText");
const loadingState = document.querySelector("#loadingState");
const submitButton = document.querySelector("#submitButton");
const resultsSection = document.querySelector("#resultsSection");
const meterFill = document.querySelector("#meterFill");
const drScore = document.querySelector("#drScore");
const resultDomain = document.querySelector("#resultDomain");
const resultDr = document.querySelector("#resultDr");
const resultStatus = document.querySelector("#resultStatus");
const insightTitle = document.querySelector("#insightTitle");
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

function getInsight(domain, score, status) {
  const insights = {
    "Very Low": {
      title: "Early-stage authority",
      body: `${domain} has a DR of ${score}, which suggests a very limited backlink profile. This is common for new sites or domains that have not earned many referring domains yet.`
    },
    Low: {
      title: "Room to build authority",
      body: `${domain} has a DR of ${score}. The site has some backlink signals, but it likely needs more relevant, quality links to compete in tougher search results.`
    },
    Average: {
      title: "Developing backlink strength",
      body: `${domain} has a DR of ${score}. This is a workable authority level for many niches, especially when the site has strong content and topic relevance.`
    },
    Strong: {
      title: "Strong authority signal",
      body: `${domain} has a DR of ${score}. That usually means the domain has a solid backlink profile and enough authority to compete in many search markets.`
    },
    "Very Strong": {
      title: "Very strong link profile",
      body: `${domain} has a DR of ${score}. Domains in this range often have many quality referring domains and stronger brand/link signals.`
    },
    Elite: {
      title: "Elite domain authority",
      body: `${domain} has a DR of ${score}. This is typically reserved for domains with exceptional backlink strength and broad authority across the web.`
    }
  };

  return insights[status] || {
    title: "Authority insight",
    body: `${domain} has a Domain Rating of ${score}. Use it as a comparison metric alongside traffic, relevance, and content quality.`
  };
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
  const insight = getInsight(domain, score, status);

  resultsSection.hidden = false;
  meterFill.style.width = `${score}%`;
  drScore.textContent = score;
  resultDomain.textContent = domain;
  resultDr.textContent = score;
  resultStatus.textContent = status;
  insightTitle.textContent = insight.title;
  interpretationText.textContent = insight.body;
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");

  const domain = cleanDomain(input.value);

  if (!domain) {
    showError("Please enter a website.");
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
