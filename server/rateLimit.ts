import type { Request, Response, NextFunction } from "express";

// Fixed-window, in-memory limiter. LIMITATION: counts live in this process only,
// so they reset on every deploy/restart and are not shared between instances.
// The site runs as a single container on Coolify, where this is sufficient; a
// shared store (e.g. Redis or Postgres) is needed before scaling out.
export class RateLimiter {
  private hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  // Records one hit for `key` and returns true if it is still within the limit.
  allow(key: string, now = Date.now()): boolean {
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      if (this.hits.size > 10_000) this.prune(now);
      return true;
    }
    entry.count += 1;
    return entry.count <= this.max;
  }

  private prune(now: number): void {
    this.hits.forEach((entry, key) => {
      if (entry.resetAt <= now) this.hits.delete(key);
    });
  }
}

export const TOO_MANY_REQUESTS = {
  success: false,
  message: "Too many requests. Please try again later.",
};

// Per-client-IP limit for one route. req.ip honours X-Forwarded-For only from trusted
// (private-range) proxies; see the "trust proxy" setting in server/app.ts.
export function limitByIp(limiter: RateLimiter) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (limiter.allow(req.ip ?? "unknown")) return next();
    res.status(429).json(TOO_MANY_REQUESTS);
  };
}
