// Strict server-side validation for the public forms. The client forms keep their
// own (looser) schemas in shared/schema.ts; the server never trusts them.
import { z } from "zod";
import { assessmentQuestions } from "@shared/questions";

const NO_CONTROL_CHARS = /^[^\u0000-\u001f\u007f]*$/;

// Addresses are trimmed and lowercased everywhere (storage, duplicate checks, per-recipient
// limits). No provider-specific rules: "+tag" and Gmail dots are kept, so such variants
// count as different addresses.
const email = z.string().trim().max(254).email().transform((v) => v.toLowerCase());
const singleLine = (max: number) => z.string().trim().min(1).max(max).regex(NO_CONTROL_CHARS);

export const subscribeSchema = z
  .object({
    email,
    interests: z
      .array(z.enum(["cloud", "ai", "leadership", "compliance"]))
      .min(1)
      .max(4)
      .refine((list) => new Set(list).size === list.length, "Duplicate interests"),
  })
  .strict();

export const SESSION_TYPES = {
  consulting: "Strategic Guidance Session",
  mentoring: "Mentoring Session",
  guidance: "Advisory Consultation",
} as const;

export const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
] as const;

const MONTHS =
  "January|February|March|April|May|June|July|August|September|October|November|December";

// Rejects dates that do not exist (e.g. "February 30, 2026"), which Date would roll over.
function isRealDate(value: string): boolean {
  const match = value.match(/^(\w+) (\d{1,2}), (\d{4})$/);
  if (!match) return false;
  const month = MONTHS.split("|").indexOf(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month, day));
  return month >= 0 && date.getUTCMonth() === month && date.getUTCDate() === day;
}

export const appointmentSchema = z
  .object({
    name: singleLine(100).refine((v) => v.length >= 2, "Name must be at least 2 characters"),
    email,
    sessionType: z.enum(["consulting", "mentoring", "guidance"]),
    // The booking form sends dates as "October 15, 2025".
    date: z
      .string()
      .trim()
      .regex(new RegExp(`^(${MONTHS}) ([1-9]|[12][0-9]|3[01]), 20[0-9]{2}$`))
      .refine(isRealDate, "Invalid date"),
    time: z.enum(TIME_SLOTS),
    message: z.string().trim().max(2000).optional(),
  })
  .strict();

// Section maximums come from the questions themselves.
const PILLARS = ["cloud", "ai", "devops", "security", "realworld"] as const;
const pillarMax = Object.fromEntries(
  PILLARS.map((p) => [
    p,
    assessmentQuestions
      .filter((q) => q.pillar === p)
      .reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.points)), 0),
  ]),
) as Record<(typeof PILLARS)[number], number>;
const totalMax = Object.values(pillarMax).reduce((a, b) => a + b, 0);

const scoreBreakdownSchema = z
  .object({
    cloud: z.number().int().min(0).max(pillarMax.cloud),
    ai: z.number().int().min(0).max(pillarMax.ai),
    devops: z.number().int().min(0).max(pillarMax.devops),
    security: z.number().int().min(0).max(pillarMax.security),
    realworld: z.number().int().min(0).max(pillarMax.realworld),
    total: z.number().int().min(0).max(totalMax),
  })
  .strict()
  .refine(
    (s) => s.total === s.cloud + s.ai + s.devops + s.security + s.realworld,
    "Total does not match the section scores",
  );

export type ScoreBreakdown = z.infer<typeof scoreBreakdownSchema>;

export const assessmentSchema = z
  .object({
    email: email.optional(),
    score: z
      .string()
      .max(500)
      .transform((raw, ctx) => {
        try {
          return JSON.parse(raw) as unknown;
        } catch {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Score is not valid JSON" });
          return z.NEVER;
        }
      })
      .pipe(scoreBreakdownSchema),
    level: z.enum(["foundation", "emerging", "skilled", "expert", "leader"]),
  })
  .strict();

// Uniform 400 body that never echoes submitted values back.
export const INVALID_INPUT = {
  success: false,
  message: "Please check your input and try again.",
};
