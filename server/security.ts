// Helpers for rendering untrusted input safely in HTML emails, calendar files and logs.

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

// RFC 5545 TEXT escaping; line breaks become a literal "\n" so a value can never
// start a new calendar property.
export function escapeIcsText(value: unknown): string {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n");
}

// Calendar parameter values (e.g. CN=...) cannot contain these characters at all.
export function sanitizeIcsParam(value: unknown): string {
  return String(value ?? "").replace(/[\r\n";:,]/g, " ").trim();
}

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

// Paths are logged without identifiers such as appointment IDs.
export function redactPath(path: string): string {
  return path.replace(UUID, ":id");
}
