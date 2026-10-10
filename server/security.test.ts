// S1 security tests. Run with: npm run test:security
// Synthetic data only; email delivery is replaced by an in-memory stub.
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import express from "express";

delete process.env.RESEND_API_KEY;

import { createApp } from "./app";
import { setEmailTransport, type EmailMessage } from "./mailer";
import { escapeHtml } from "./security";
import { generateICalendar, LIMITS } from "./routes";
import { storage } from "./storage";

const sent: EmailMessage[] = [];
setEmailTransport(async (m) => {
  sent.push(m);
});

let unique = 0;
const fakeEmail = () => `s1-test-${process.pid}-${++unique}@example.test`;

async function startApp(): Promise<{ base: string; server: Server }> {
  const { server } = await createApp();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { base: `http://127.0.0.1:${(server.address() as AddressInfo).port}`, server };
}

let base = "";
let server: Server;
before(async () => ({ base, server } = await startApp()));
after(() => server.close());
beforeEach(() => {
  sent.length = 0;
});

const post = (path: string, body: unknown, b = base) =>
  fetch(b + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const validScore = { cloud: 10, ai: 8, devops: 6, security: 7, realworld: 9, total: 40 };
const validAppointment = () => ({
  name: "Test Person",
  email: fakeEmail(),
  sessionType: "consulting",
  date: "October 15, 2026",
  time: "10:00 AM",
  message: "Synthetic test message",
});

// ---------- A. Subscriber exposure ----------

test("subscriber list API is not reachable, with or without credentials", async () => {
  for (const path of ["/api/subscribers", "/api/subscribers/", "/API/SUBSCRIBERS", "/api/admin/subscribers", "/api/subscriber"]) {
    for (const headers of [{}, { Authorization: "Bearer anything" }, { Authorization: "Basic " + Buffer.from("admin:admin").toString("base64") }]) {
      const res = await fetch(base + path, { headers });
      assert.equal(res.status, 404, `${path} ${JSON.stringify(headers)}`);
      assert.doesNotMatch(await res.text(), /@example\.test/);
    }
  }
});

test("no server code path returns the subscriber list", () => {
  const offenders = readdirSync("server")
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && f !== "storage.ts")
    .filter((f) => readFileSync(join("server", f), "utf8").includes("getSubscribers("));
  assert.deepEqual(offenders, []);
  assert.doesNotMatch(readFileSync("client/src/App.tsx", "utf8"), /Subscribers|admin\/subscribers/);
});

test("/admin/subscribers is not served by the SPA fallback (404)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "s1-static-"));
  mkdirSync(join(dir, "dist", "public"), { recursive: true });
  writeFileSync(
    join(dir, "dist", "public", "index.html"),
    '<html><head><title>x</title><meta name="description" content="x" /><meta name="robots" content="index, follow" />' +
      '<link rel="canonical" href="https://chetangabhane.in" /></head><body><div id="root"></div></body></html>',
  );
  // serveStatic prerenders the guide markdown at startup; provide the real files.
  mkdirSync(join(dir, "dist", "public", "ai-readiness"), { recursive: true });
  for (const f of readdirSync(join("client", "public", "ai-readiness")).filter((n) => n.endsWith(".md"))) {
    writeFileSync(join(dir, "dist", "public", "ai-readiness", f), readFileSync(join("client", "public", "ai-readiness", f)));
  }
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const { serveStatic } = await import("./static");
    const app = express();
    serveStatic(app);
    const s = app.listen(0, "127.0.0.1");
    await new Promise((r) => s.once("listening", r));
    const b = `http://127.0.0.1:${(s.address() as AddressInfo).port}`;
    assert.equal((await fetch(b + "/admin/subscribers")).status, 404);
    assert.equal((await fetch(b + "/admin")).status, 404);
    assert.equal((await fetch(b + "/")).status, 200);
    s.close();
  } finally {
    process.chdir(cwd);
  }
});

// ---------- B. Validation ----------

test("invalid or malformed input returns a controlled 400 without echoing values", async () => {
  const cases: Array<[string, unknown]> = [
    ["/api/assessments", { level: "hacker", score: JSON.stringify(validScore) }],
    ["/api/assessments", { level: "skilled", score: "{not json" }],
    ["/api/assessments", { level: "skilled", score: JSON.stringify({ ...validScore, total: 59 }) }],
    ["/api/assessments", { level: "skilled", score: JSON.stringify({ ...validScore, cloud: 99, total: 129 }) }],
    ["/api/assessments", { level: "skilled", score: JSON.stringify(validScore), extra: "field" }],
    ["/api/subscribe", { email: "not-an-email", interests: ["cloud"] }],
    ["/api/subscribe", { email: fakeEmail(), interests: ["<b>bold</b>"] }],
    ["/api/subscribe", { email: fakeEmail(), interests: [] }],
    ["/api/appointments", { ...validAppointment(), sessionType: "free-lunch" }],
    ["/api/appointments", { ...validAppointment(), time: "03:30 AM" }],
    ["/api/appointments", { ...validAppointment(), date: "<script>" }],
    ["/api/appointments", { ...validAppointment(), name: "Line\r\nBreak" }],
    ["/api/appointments", { ...validAppointment(), message: "x".repeat(2001) }],
  ];
  for (const [path, body] of cases) {
    const { base: b, server: s } = await startApp(); // fresh limiter per case
    const res = await post(path, body, b);
    const text = await res.text();
    s.close();
    assert.equal(res.status, 400, `${path} ${JSON.stringify(body).slice(0, 80)}`);
    assert.deepEqual(JSON.parse(text), { success: false, message: "Please check your input and try again." });
  }
  assert.equal(sent.length, 0, "no email for invalid input");
});

test("malformed JSON and oversized bodies get a 4xx, not a crash", async () => {
  const bad = await fetch(base + "/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{oops" });
  assert.equal(bad.status, 400);
  const big = await post("/api/appointments", { ...validAppointment(), message: "x".repeat(20_000) });
  assert.equal(big.status, 413);
});

// ---------- B/C. Email rendering ----------

test("user-controlled values are HTML-escaped in emails; no meeting links are sent", async () => {
  const { base: b, server: s } = await startApp();
  const evil = `<script>alert("x")</script> O'Brien & <b>Co</b>`;
  const res = await post("/api/appointments", { ...validAppointment(), name: evil, message: `<img src=x onerror=alert(1)>\nsecond line` }, b);
  s.close();
  assert.equal(res.status, 200);
  assert.equal(sent.length, 2, "owner notification + visitor confirmation");
  for (const m of sent) {
    assert.doesNotMatch(m.html, /<script>|<img |<b>Co<\/b>/);
    assert.doesNotMatch(m.html + m.text, /zoom\.us|meet\.google|pwd=|meeting id|passcode/i);
    assert.ok(m.text.length > 20, "plain-text alternative present");
  }
  const owner = sent.find((m) => m.to === "contact@chetangabhane.in")!;
  assert.match(owner.html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; O&#39;Brien &amp; &lt;b&gt;Co&lt;\/b&gt;/);
});

test("booking confirmation to the visitor carries no visitor-supplied name or message", async () => {
  const { base: b, server: s } = await startApp();
  const booking = { ...validAppointment(), name: "Visit Phisher", message: "Your account is locked, go to evil.example.test now" };
  assert.equal((await post("/api/appointments", booking, b)).status, 200);
  s.close();
  const visitor = sent.find((m) => m.to === booking.email);
  assert.ok(visitor, "confirmation sent");
  const body = visitor.html + visitor.text;
  assert.doesNotMatch(body, /Visit Phisher|Visit&#|account is locked|evil\.example/);
  assert.match(visitor.html, /<p>Hello,<\/p>/);
  assert.match(visitor.text, /^Hello,$/m);
  assert.match(body, /Strategic Guidance Session/);
  assert.match(body, /October 15, 2026/);
});

test("escapeHtml escapes < > & quotes and apostrophes", () => {
  assert.equal(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`), "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;");
});

test("calendar files cannot be injected and contain no meeting links", async () => {
  const ics = generateICalendar(
    { id: "11111111-1111-4111-8111-111111111111", name: "Eve\r\nATTENDEE:mailto:evil@example.test", email: "a@example.test", sessionType: "consulting", date: "October 15, 2026", time: "10:00 AM", message: null, status: "pending", createdAt: new Date() },
    "Strategic Guidance Session",
  );
  assert.equal(ics.split("\r\n").filter((l) => l.startsWith("ATTENDEE")).length, 1);
  assert.doesNotMatch(ics, /\r\nATTENDEE:mailto:evil/);
  assert.doesNotMatch(ics, /zoom\.us|meet\.google|pwd=/i);

  const { base: b, server: s } = await startApp();
  const created = await (await post("/api/appointments", validAppointment(), b)).json();
  const cal = await fetch(`${b}/api/appointments/${created.appointmentId}/calendar`);
  s.close();
  assert.equal(cal.status, 200);
  assert.match(cal.headers.get("content-type") ?? "", /text\/calendar/);
  assert.doesNotMatch(await cal.text(), /zoom\.us|meet\.google|pwd=/i);
});

// ---------- C. Rate limits ----------

test("each form is limited to 5 requests per IP per 15 minutes (6th gets 429)", async () => {
  const bodies: Record<string, () => unknown> = {
    "/api/appointments": validAppointment,
    "/api/subscribe": () => ({ email: fakeEmail(), interests: ["ai"] }),
    "/api/assessments": () => ({ level: "skilled", score: JSON.stringify(validScore) }),
  };
  for (const [path, body] of Object.entries(bodies)) {
    const { base: b, server: s } = await startApp();
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(path, body(), b)).status);
    s.close();
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429], path);
  }
});

test("at most 3 emails per recipient per day", async () => {
  const { base: b, server: s } = await startApp();
  const email = fakeEmail();
  for (let i = 0; i < 4; i++) {
    assert.equal((await post("/api/assessments", { email, level: "skilled", score: JSON.stringify(validScore) }, b)).status, 200);
  }
  s.close();
  assert.equal(sent.filter((m) => m.to === email).length, 3);
});

// ---------- Valid flows and subscriber privacy ----------

test("valid flows work; duplicate sign-up gets the same response and no second email", async () => {
  const { base: b, server: s } = await startApp();
  const email = fakeEmail();
  const first = await post("/api/subscribe", { email, interests: ["cloud", "ai"] }, b);
  const second = await post("/api/subscribe", { email, interests: ["cloud"] }, b);
  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.deepEqual(await first.json(), await second.json());
  assert.equal(sent.filter((m) => m.to === email).length, 1);

  const assessment = await post("/api/assessments", { level: "skilled", score: JSON.stringify(validScore) }, b);
  assert.equal(assessment.status, 200);
  const appointment = await post("/api/appointments", validAppointment(), b);
  assert.equal(appointment.status, 200);
  s.close();
});

// ---------- D. Logging ----------

test("logs contain only metadata: no emails, names, messages, bodies or meeting links", async () => {
  const lines: string[] = [];
  const original = { log: console.log, error: console.error, warn: console.warn };
  for (const k of ["log", "error", "warn"] as const) console[k] = (...a: unknown[]) => lines.push(a.map(String).join(" "));
  try {
    const { base: b, server: s } = await startApp();
    const email = fakeEmail();
    await post("/api/subscribe", { email, interests: ["leadership"] }, b);
    await post("/api/appointments", { ...validAppointment(), email, name: "Logcheck Person", message: "Private message text" }, b);
    await post("/api/assessments", { email, level: "bogus", score: "{}" }, b);
    await fetch(b + "/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{broken" });
    await fetch(b + "/api/subscribers");
    s.close();
    await new Promise((r) => setTimeout(r, 50));
  } finally {
    Object.assign(console, original);
  }
  const all = lines.join("\n");
  assert.ok(lines.some((l) => /^POST \/api\/subscribe 200 \d+ms id=/.test(l)), "metadata log line present");
  assert.ok(lines.some((l) => /^POST \/api\/subscribe 400 \d+ms id=/.test(l)), "rejected (malformed) request is logged too");
  assert.doesNotMatch(all, /@example\.test|Logcheck Person|Private message text|zoom\.us|meet\.google|\{broken|"interests"/);
});

// ---------- E. Proxy trust and forwarded headers ----------

// Resolves req.ip exactly as Express does for a connection from `peer` with `xff`.
async function clientIp(peer: string, xff?: string): Promise<string | undefined> {
  const { app } = await createApp();
  const req = Object.create(app.request);
  req.app = app;
  req.headers = xff ? { "x-forwarded-for": xff } : {};
  req.connection = req.socket = { remoteAddress: peer };
  return req.ip;
}

test("only a private-network proxy may set the client IP; spoofed entries are ignored", async () => {
  // Coolify's proxy on the Docker network: the address it appended is used.
  assert.equal(await clientIp("10.0.1.5", "198.51.100.7"), "198.51.100.7");
  // Client-supplied entries before the proxy's own entry cannot change the result.
  assert.equal(await clientIp("10.0.1.5", "203.0.113.1, 198.51.100.7"), "198.51.100.7");
  assert.equal(await clientIp("172.18.0.3", "1.2.3.4, 10.9.9.9, 198.51.100.7"), "198.51.100.7");
  // Direct connection from the internet: the header is ignored entirely.
  assert.equal(await clientIp("198.51.100.7", "203.0.113.1"), "198.51.100.7");
  // Loopback is not a trusted proxy.
  assert.equal(await clientIp("127.0.0.1", "203.0.113.1"), "127.0.0.1");
});

test("rotating X-Forwarded-For from a direct connection does not bypass the per-IP limit", async () => {
  for (const path of ["/api/subscribe", "/api/appointments", "/api/assessments"]) {
    const { base: b, server: s } = await startApp();
    const statuses: number[] = [];
    for (let i = 0; i < 8; i++) {
      const body =
        path === "/api/subscribe" ? { email: fakeEmail(), interests: ["ai"] }
        : path === "/api/appointments" ? validAppointment()
        : { level: "skilled", score: JSON.stringify(validScore) };
      const res = await fetch(b + path, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": `203.0.113.${i}`, "X-Real-IP": `198.51.100.${i}` },
        body: JSON.stringify(body),
      });
      statuses.push(res.status);
    }
    s.close();
    assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429, 429], path);
  }
});

// ---------- F. Owner notification cap ----------

test("owner notifications are capped globally per hour; bookings are still accepted", async () => {
  const saved = { ...LIMITS };
  LIMITS.formRequestsPerIp = 1000; // isolate the global cap from the per-IP limit
  try {
    const { base: b, server: s } = await startApp();
    const cap = LIMITS.ownerNotificationsPerHour;
    for (let i = 0; i < cap + 3; i++) {
      assert.equal((await post("/api/appointments", validAppointment(), b)).status, 200);
    }
    s.close();
    assert.equal(sent.filter((m) => m.to === "contact@chetangabhane.in").length, cap);
    assert.equal(sent.filter((m) => m.to !== "contact@chetangabhane.in").length, cap + 3, "visitor confirmations unaffected");
  } finally {
    Object.assign(LIMITS, saved);
  }
});

// ---------- G. Email normalisation ----------

test("duplicate sign-ups are detected regardless of case and surrounding spaces", async () => {
  const { base: b, server: s } = await startApp();
  const local = `case-${process.pid}-${++unique}`;
  const first = await post("/api/subscribe", { email: `${local}@example.test`, interests: ["ai"] }, b);
  const second = await post("/api/subscribe", { email: `  ${local.toUpperCase()}@EXAMPLE.TEST `, interests: ["ai"] }, b);
  s.close();
  assert.deepEqual(await first.json(), await second.json());
  assert.equal(sent.length, 1, "one welcome email");
  assert.equal(sent[0].to, `${local}@example.test`, "stored and mailed in lowercase");
});

test("per-recipient cap counts case variants together; +tag variants are separate by policy", async () => {
  const { base: b, server: s } = await startApp();
  const local = `cap-${process.pid}-${++unique}`;
  const variants = [`${local}@example.test`, `${local.toUpperCase()}@example.test`, ` ${local}@EXAMPLE.test`, `${local}@Example.Test`];
  for (const email of variants) {
    assert.equal((await post("/api/assessments", { email, level: "skilled", score: JSON.stringify(validScore) }, b)).status, 200);
  }
  assert.equal(sent.length, 3, "case variants share one cap of 3");
  // Documented policy: no provider-specific normalisation, so "+tag" is a different address.
  await post("/api/assessments", { email: `${local}+tag@example.test`, level: "skilled", score: JSON.stringify(validScore) }, b);
  s.close();
  assert.equal(sent.length, 4);
  assert.equal(sent[3].to, `${local}+tag@example.test`);
});

// ---------- H. Calendar dates ----------

test("impossible or malformed booking dates are rejected; a real leap day is accepted", async () => {
  for (const date of ["February 30, 2026", "April 31, 2026", "February 29, 2027", "June 0, 2026", "Smarch 3, 2026", "October 15 2026"]) {
    const { base: b, server: s } = await startApp();
    const res = await post("/api/appointments", { ...validAppointment(), date }, b);
    s.close();
    assert.equal(res.status, 400, date);
  }
  const { base: b, server: s } = await startApp();
  assert.equal((await post("/api/appointments", { ...validAppointment(), date: "February 29, 2028" }, b)).status, 200);
  s.close();
});

// ---------- I. Storage failure ----------

test("storage failures return a generic 500 without leaking error details", async () => {
  const detail = "synthetic-db-failure-detail";
  const originals = { createSubscriber: storage.createSubscriber, createAssessment: storage.createAssessment, createAppointment: storage.createAppointment };
  const fail = async (): Promise<never> => {
    throw new Error(detail);
  };
  storage.createSubscriber = fail;
  storage.createAssessment = fail;
  storage.createAppointment = fail;
  const lines: string[] = [];
  const original = { log: console.log, error: console.error, warn: console.warn };
  for (const k of ["log", "error", "warn"] as const) console[k] = (...a: unknown[]) => lines.push(a.map(String).join(" "));
  try {
    const { base: b, server: s } = await startApp();
    const results = [
      await post("/api/subscribe", { email: fakeEmail(), interests: ["ai"] }, b),
      await post("/api/assessments", { level: "skilled", score: JSON.stringify(validScore) }, b),
      await post("/api/appointments", validAppointment(), b),
    ];
    s.close();
    for (const res of results) {
      assert.equal(res.status, 500);
      const body = await res.json();
      assert.equal(body.success, false);
      assert.doesNotMatch(JSON.stringify(body), new RegExp(detail));
    }
  } finally {
    Object.assign(console, original);
    Object.assign(storage, originals);
  }
  assert.doesNotMatch(lines.join("\n"), new RegExp(`${detail}|@example\.test`));
  assert.equal(sent.length, 0, "no email when the record could not be stored");
});
