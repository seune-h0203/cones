/** Resolve a /public asset against the deployment base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

/** Absolute URL — required by crawlers for og:image / og:url. */
export function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return new URL(asset(path), window.location.href).href;
}
