// Thin client around the three endpoints exposed by the Spring Boot backend:
//   POST /api/save              -> { actualUrl, shortCode }
//   GET  /api/analytics/{code}  -> { shortCode, totalClicks }
//   GET  /redirect/{code}       -> 302 redirect (rate-limited, 2/min per IP)

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function parseErrorMessage(res, fallback) {
  try {
    const body = await res.json();
    if (body?.message) return body.message;
  } catch {
    // response wasn't JSON — fall through to the generic message
  }
  return fallback;
}

export async function shortenUrl(url) {
  const res = await fetch(`${BASE_URL}/api/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "The server couldn't save that link."));
  }

  return res.json();
}

export async function getAnalytics(shortCode) {
  const res = await fetch(`${BASE_URL}/api/analytics/${shortCode}`);

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res, "Couldn't load clicks for this link."));
  }

  return res.json();
}

export function shortLinkFor(shortCode) {
  return `${BASE_URL}/redirect/${shortCode}`;
}
