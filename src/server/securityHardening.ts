import type { Request, Response, NextFunction } from 'express';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 180;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

/**
 * Production HTTP security hardening middleware for Chronos Vault (Express).
 * Protects against MIME sniffing, clickjacking, referrer leaks, stack fingerprinting,
 * malformed/oversized URLs, and path traversal attempts.
 */
export function securityHardeningMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader(
    'Permissions-Policy',
    'camera=(self), microphone=(self), geolocation=(), payment=()'
  );
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  if (process.env.NODE_ENV === 'production' && req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  const rawUrl = req.originalUrl || '';
  if (rawUrl.length > 4096) {
    res.status(414).json({ error: 'Request URI too long.' });
    return;
  }

  let decodedUrl = '';
  try {
    decodedUrl = decodeURIComponent(rawUrl);
  } catch {
    res.status(400).json({ error: 'Malformed URL encoding.' });
    return;
  }

  // Block path traversal (including encoded variants) and null-byte injection
  if (
    decodedUrl.includes('..') ||
    decodedUrl.includes('\0') ||
    rawUrl.toLowerCase().includes('%2e%2e')
  ) {
    res.status(400).json({ error: 'Invalid request path.' });
    return;
  }

  next();
}

/**
 * Lightweight in-memory sliding-window rate limiter for /api/* routes.
 */
export function apiRateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const now = Date.now();
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const entry = rateBuckets.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    res.setHeader('X-RateLimit-Limit', String(RATE_MAX_REQUESTS));
    res.setHeader('X-RateLimit-Remaining', String(RATE_MAX_REQUESTS - 1));
  } else {
    entry.count += 1;
    const remaining = Math.max(0, RATE_MAX_REQUESTS - entry.count);
    res.setHeader('X-RateLimit-Limit', String(RATE_MAX_REQUESTS));
    res.setHeader('X-RateLimit-Remaining', String(remaining));
    if (entry.count > RATE_MAX_REQUESTS) {
      const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      res.setHeader('Retry-After', String(retryAfter));
      res.status(429).json({ error: 'Too many API requests. Please retry shortly.' });
      return;
    }
  }

  // Opportunistic cleanup to keep memory bounded
  if (rateBuckets.size > 1000) {
    for (const [key, bucket] of rateBuckets) {
      if (now >= bucket.resetAt) rateBuckets.delete(key);
    }
  }

  next();
}
