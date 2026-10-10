import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const SITE_URL = "https://chetangabhane.in";

// Per-page metadata sent in the initial HTML so search engines and social
// previews see the right title, description and canonical URL without running
// JavaScript. Keep in sync with the <SEO> props in client/src/pages.
// NOTE: this file is built standalone (see Dockerfile), so it must not import
// other local modules.
type PageMeta = {
  title: string;
  description: string;
  heading: string;
  inSitemap: boolean;
  noindex?: boolean;
};

const PAGES: Record<string, PageMeta> = {
  "/": {
    title: "Chetan Gabhane – Cloud & AI Evangelist | Author | Strategic Advisor",
    description:
      "Cloud & AI Evangelist helping enterprises navigate cloud transformation and AI innovation. Author of books on cloud strategy, VMware transitions, and AI operations. Book strategic consultations.",
    heading: "Chetan Gabhane – Cloud & AI Evangelist, Author and Strategic Advisor",
    inSitemap: true,
  },
  "/blog": {
    title: "Blog – Cloud & AI Insights | Chetan Gabhane",
    description:
      "Thought leadership on cloud strategy, AI operations, VMware transitions, and enterprise architecture. Expert insights from cloud evangelist Chetan Gabhane.",
    heading: "Blog – Cloud & AI Insights",
    inSitemap: true,
  },
  "/blog/cloud-migrations": {
    title: "Why Most Cloud Migrations Fail – and How to Fix It | Chetan Gabhane",
    description:
      "Cloud adoption continues to accelerate, but many enterprises still find their migration initiatives stalling or failing outright. Learn the five most common reasons migrations fail and practical steps to avoid them.",
    heading: "Why Most Cloud Migrations Fail – and How to Fix It",
    inSitemap: true,
  },
  "/career-assessment": {
    title: "CloudAI PathFinder - Career Readiness Assessment",
    description:
      "Discover your Cloud and AI career readiness. Free 15-question assessment with personalized roadmap and next steps.",
    heading: "CloudAI PathFinder – Cloud and AI Career Readiness Assessment",
    inSitemap: true,
  },
  "/press-kit": {
    title: "Press Kit – Media Resources & Speaking Topics | Chetan Gabhane",
    description:
      "Media kit for Chetan Gabhane: professional bio, headshots, book covers, speaking topics. Available for conferences, podcasts, and media interviews on cloud strategy and AI.",
    heading: "Press Kit – Media Resources and Speaking Topics",
    inSitemap: true,
  },
  "/visual-generator": {
    title: "Visual Content Generator – Create Substack Diagrams",
    description:
      "Generate professional diagrams and infographics for your Substack posts on AI, cloud, and technology topics.",
    heading: "Visual Content Generator",
    inSitemap: false,
  },
  "/admin/subscribers": {
    title: "Subscribers | Chetan Gabhane",
    description: "Admin page.",
    heading: "Subscribers",
    inSitemap: false,
    noindex: true,
  },
};

const NOT_FOUND: PageMeta = {
  title: "Page not found | Chetan Gabhane",
  description: "The page you are looking for does not exist.",
  heading: "Page not found",
  inSitemap: false,
  noindex: true,
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setMeta(html: string, attr: "name" | "property", key: string, value: string): string {
  const pattern = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  return html.replace(pattern, `$1${value}$2`);
}

function renderPage(template: string, meta: PageMeta, url: string): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = setMeta(html, "name", "title", title);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "name", "robots", meta.noindex ? "noindex, follow" : "index, follow");
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "twitter:url", url);
  html = setMeta(html, "property", "twitter:title", title);
  html = setMeta(html, "property", "twitter:description", description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  // Readable fallback text for crawlers; React replaces it on mount.
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"><h1>${escapeHtml(meta.heading)}</h1><p>${description}</p></div>`,
  );
}

function normalizePath(p: string): string {
  return p.length > 1 ? p.replace(/\/+$/, "") : p;
}

function buildSitemap(): string {
  const urls = Object.entries(PAGES)
    .filter(([, meta]) => meta.inSitemap)
    .map(([p]) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function serveStatic(app: Express) {
  // In production, the server bundle is at dist/index.js
  // and static files are at dist/public/
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    log(`Build directory not found at: ${distPath}`, "express");
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").send(buildSitemap());
  });

  log(`Serving static files from: ${distPath}`, "express");
  app.use(express.static(distPath, { index: false }));

  // fall through to index.html with page-specific metadata; unknown paths get a real 404
  app.use("*", (req, res) => {
    const pagePath = normalizePath(req.baseUrl || req.path);
    const meta = PAGES[pagePath];
    const url = `${SITE_URL}${pagePath === "/" ? "" : pagePath}`;
    res
      .status(meta ? 200 : 404)
      .type("html")
      .send(renderPage(template, meta ?? NOT_FOUND, url));
  });
}
