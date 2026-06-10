const form = document.querySelector("#checkerForm");
const input = document.querySelector("#domainInput");
const errorText = document.querySelector("#errorText");
const loadingState = document.querySelector("#loadingState");
const submitButton = document.querySelector("#submitButton");
const resultsSection = document.querySelector("#resultsSection");
const meterFill = document.querySelector("#meterFill");
const drScore = document.querySelector("#drScore");
const scoreNeedle = document.querySelector("#scoreNeedle");
const scoreSummary = document.querySelector("#scoreSummary");
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
  if (score < 30) return "Bad";
  if (score < 50) return "Fair";
  if (score < 75) return "Good";
  return "Excellent";
}

function getInsight(domain, score, status) {
  const insights = {
    Bad: {
      title: "Bad backlink authority",
      body: `${domain} has a DR of ${score}. This usually means the site has a limited backlink profile and needs more quality referring domains before it can compete in tougher search results.`
    },
    Fair: {
      title: "Fair authority, still growing",
      body: `${domain} has a DR of ${score}. The domain has some backlink strength, but it still has room to grow with more relevant and trusted links.`
    },
    Good: {
      title: "Good domain authority",
      body: `${domain} has a DR of ${score}. This is a solid authority signal and usually means the domain has a meaningful backlink profile.`
    },
    Excellent: {
      title: "Excellent backlink authority",
      body: `${domain} has a DR of ${score}. Domains in this range often have strong brand signals, many quality referring domains, and serious link authority.`
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
  const needleAngle = -90 + (score / 100) * 180;

  resultsSection.hidden = false;
  meterFill.style.width = `${score}%`;
  drScore.textContent = score;
  scoreNeedle.style.transform = `rotate(${needleAngle}deg)`;
  scoreSummary.textContent = `${status} authority category`;
  resultDomain.textContent = domain;
  resultDr.textContent = score;
  resultStatus.textContent = status;
  resultStatus.className = `status-pill status-${status.toLowerCase()}`;
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
