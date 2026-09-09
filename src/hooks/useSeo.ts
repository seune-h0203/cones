import { useEffect } from "react";
import { absoluteUrl } from "../utils/asset";

interface Seo {
  title: string;
  description: string;
  /** public-relative path, e.g. "images/og/rina.jpg" */
  image?: string;
}

function setMeta(attribute: "name" | "property", key: string, content: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Per-route document title, description and Open Graph tags. */
export function useSeo({ title, description, image }: Seo): void {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", window.location.href);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (image) {
      const absolute = absoluteUrl(image);
      setMeta("property", "og:image", absolute);
      setMeta("name", "twitter:image", absolute);
    }
  }, [title, description, image]);
}
