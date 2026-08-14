// Minimal in-memory fixed-window rate limiter. No external dependency
// required. Not suitable for a multi-process/clustered deployment (state
// isn't shared across workers) but this app runs as a single Node process,
// so it's sufficient to blunt brute-force attempts against auth-sensitive
// endpoints (login, password reset, verification codes).

function rateLimit({ windowMs = 15 * 60 * 1000, max = 10, message = "Too many requests, please try again later." } = {}) {
  const hits = new Map(); // key -> { count, resetAt }

  // Periodically sweep expired entries so the map doesn't grow unbounded.
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const now = Date.now();
    let entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }

    entry.count += 1;

    if (entry.count > max) {
      return res.status(429).json({ success: false, msg: message });
    }

    next();
  };
}

module.exports = rateLimit;
