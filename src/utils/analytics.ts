/**
 * Analytics abstraction.
 *
 * No tracking ID is bundled. Events are forwarded only when the host page has
 * already installed a collector (gtag or a dataLayer); otherwise every call is
 * an intentional no-op, so the site ships without touching visitor privacy.
 */

export type AnalyticsEvent =
  | "page_view"
  | "artist_view"
  | "teaser_play"
  | "teaser_complete"
  | "world_view"
  | "project_view"
  | "countdown_view";

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Params) => void;
    dataLayer?: Params[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}
