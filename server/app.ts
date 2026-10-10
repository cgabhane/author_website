import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "crypto";
import type { Server } from "http";
import { registerRoutes } from "./routes";
import { redactPath } from "./security";

// Builds the Express app shared by the production server (server/index.ts), the
// Vercel entry (api/index.ts) and the tests. Static/Vite serving is added by the caller.
export async function createApp(): Promise<{ app: Express; server: Server }> {
  const app = express();

  // Coolify's TLS proxy reaches the container over a private Docker network, so only
  // private-range peers may set X-Forwarded-For. A client connecting directly (the
  // container port is reachable from the internet) is not trusted, so a spoofed header
  // cannot change req.ip. Loopback is deliberately not trusted. TRUST_PROXY may narrow
  // this to the proxy's exact address or subnet once verified in Coolify.
  app.set("trust proxy", process.env.TRUST_PROXY || "uniquelocal");
  app.disable("x-powered-by");

  // Metadata-only request log: method, path (identifiers redacted), status, duration,
  // request ID. Never request or response bodies. Registered before the body parsers
  // so rejected (malformed or oversized) requests are logged too.
  app.use((req, res, next) => {
    const start = Date.now();
    const requestId = randomUUID();
    res.setHeader("X-Request-Id", requestId);
    res.on("finish", () => {
      if (!req.path.startsWith("/api")) return;
      console.log(
        `${req.method} ${redactPath(req.path)} ${res.statusCode} ${Date.now() - start}ms id=${requestId}`,
      );
    });
    next();
  });

  app.use(express.json({ limit: "10kb" }));
  app.use(express.urlencoded({ extended: false, limit: "10kb" }));

  const server = await registerRoutes(app);

  // Generic error responses; malformed JSON and oversized bodies get a 4xx, nothing
  // from the request is echoed or logged.
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = Number(err?.status || err?.statusCode) || 500;
    const safeStatus = status >= 400 && status < 600 ? status : 500;
    console.error(
      `[error] ${req.method} ${redactPath(req.path)} ${safeStatus} ${err?.type ?? err?.name ?? "error"}`,
    );
    if (res.headersSent) return;
    res.status(safeStatus).json({
      success: false,
      message: safeStatus < 500 ? "The request could not be processed." : "Internal Server Error",
    });
  });

  return { app, server };
}
