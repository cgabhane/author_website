import type { Request, Response } from "express";
import { createApp } from "../server/app";

// Vercel serverless entry. Uses the same app (validation, rate limits, metadata-only
// logging, safe error handling) as the production server.
const ready = createApp();

export default async function handler(req: Request, res: Response) {
  const { app } = await ready;
  return app(req, res);
}
