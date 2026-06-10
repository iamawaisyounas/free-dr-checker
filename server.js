import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function json(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(payload));
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

async function handleDrChecker(req, res, url) {
  const domain = normalizeDomain(url.searchParams.get("domain"));

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

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = normalize(join(publicDir, requestedPath));

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    res.end(content);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/api/dr-checker") {
    await handleDrChecker(req, res, url);
    return;
  }

  if (req.method === "GET" || req.method === "HEAD") {
    await serveStatic(req, res, url);
    return;
  }

  res.writeHead(405, { allow: "GET" });
  res.end("Method not allowed");
}).listen(port, () => {
  console.log(`Free DR Checker running at http://localhost:${port}`);
});
