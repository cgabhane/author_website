import posthog from "posthog-js";

// Public project token (safe to ship in the browser). The PostHog project is shared
// with quantumread.space, so every event is tagged with `site` for filtering.
const POSTHOG_TOKEN = "phc_wZBphFwiPByJzsW5DwQjb4Y9qB2neSGodUiM4ewUT8Mx";

let initialised = false;

export function initPostHog() {
  if (initialised || typeof window === "undefined") return;
  posthog.init(POSTHOG_TOKEN, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: "history_change",
    disable_session_recording: true,
  });
  posthog.register({ site: "chetangabhane.in" });
  initialised = true;
}

// Event properties must never contain names, emails or free text.
export function track(event: string, properties?: Record<string, string | number>) {
  if (!initialised) return;
  posthog.capture(event, properties);
}
