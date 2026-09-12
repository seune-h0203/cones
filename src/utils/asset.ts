/** Resolve a /public asset against the deployment base path. */
export function asset(path: string): string {
  // import.meta.env.BASE_URL is the build-time "./" from vite.config's
  // relative base — resolving that against the current document breaks as
  // soon as a route is nested more than one segment deep (e.g.
  // /shop/product/:slug), because the browser strips one path segment per
  // "./" merge, not down to the deployment root. window.__CONES_BASE__ is
  // the actual runtime deployment root (same value BrowserRouter's
  // basename uses — see index.html), so prefer it once it's known.
  const base = (typeof window !== "undefined" && window.__CONES_BASE__) || import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}

/** Absolute URL — required by crawlers for og:image / og:url. */
export function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return new URL(asset(path), window.location.href).href;
}
