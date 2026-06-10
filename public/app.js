const form = document.querySelector("#checkerForm");
const input = document.querySelector("#domainInput");
const errorText = document.querySelector("#errorText");
const loadingState = document.querySelector("#loadingState");
const submitButton = document.querySelector("#submitButton");
const emptyState = document.querySelector("#emptyState");
const resultCard = document.querySelector("#resultCard");
const drScore = document.querySelector("#drScore");
const scoreNeedle = document.querySelector("#scoreNeedle");
const scoreSummary = document.querySelector("#scoreSummary");
const resultDomain = document.querySelector("#resultDomain");
const resultDr = document.querySelector("#resultDr");
const resultStatus = document.querySelector("#resultStatus");
const interpretationText = document.querySelector("#interpretationText");
const scoreRanges = document.querySelectorAll(".score-ranges [data-range]");

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
  if (score < 30) return "Poor";
  if (score < 50) return "Fair";
  if (score < 70) return "Good";
  return "Excellent";
}

function getInsight(domain, score, status) {
  const insights = {
    Poor: `${domain} has a DR of ${score}. Low authority - focus on earning relevant, high-quality backlinks.`,
    Fair: `${domain} has a DR of ${score}. Moderate authority - the domain has some backlink strength but still has room to grow.`,
    Good: `${domain} has a DR of ${score}. Strong authority - this domain can be competitive in many niches.`,
    Excellent: `${domain} has a DR of ${score}. Top-tier authority - this suggests an outstanding backlink profile.`
  };

  return insights[status] || `${domain} has a Domain Rating of ${score}. Use it as a comparison metric alongside traffic, relevance, and content quality.`;
}

function pointOnGauge(score) {
  const safeScore = Math.max(0, Math.min(100, score));
  const angle = Math.PI * (1 - safeScore / 100);

  return {
    x: 160 + 124 * Math.cos(angle),
    y: 170 - 124 * Math.sin(angle)
  };
}

function setActiveRange(status) {
  scoreRanges.forEach((range) => {
    range.classList.toggle("is-active", range.dataset.range === status.toLowerCase());
  });
}

function setLoading(isLoading) {
  loadingState.hidden = !isLoading;
  submitButton.disabled = isLoading;
  input.disabled = isLoading;
  submitButton.querySelector("span").textContent = isLoading ? "Checking..." : "Check DR";
}

function showError(message) {
  errorText.textContent = message;
}

function renderResult(domain, dr) {
  const score = Math.max(0, Math.min(100, Number(dr) || 0));
  const status = getStatus(score);
  const needlePoint = pointOnGauge(score);

  emptyState.hidden = true;
  resultCard.hidden = false;
  drScore.textContent = score;
  scoreNeedle.setAttribute("x2", needlePoint.x.toFixed(1));
  scoreNeedle.setAttribute("y2", needlePoint.y.toFixed(1));
  scoreSummary.textContent = status;
  resultDomain.textContent = domain;
  resultDr.textContent = score;
  resultStatus.textContent = status;
  resultStatus.className = `status-pill status-${status.toLowerCase()}`;
  interpretationText.textContent = getInsight(domain, score, status);
  setActiveRange(status);
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
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
