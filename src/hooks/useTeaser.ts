import { useEffect, useState } from "react";
import { asset } from "../utils/asset";

export interface TeaserSource {
  desktop: string;
  mobile?: string;
  label?: string;
}

interface Manifest {
  teasers?: Record<string, TeaserSource>;
}

let manifestRequest: Promise<Record<string, TeaserSource>> | null = null;

/**
 * Teaser availability is declared in /public/videos/manifest.json, so the app
 * never requests a file that has not been delivered yet — no 404s, no broken
 * players. Registering a dropped-in file is a one-line manifest edit.
 */
function loadManifest(): Promise<Record<string, TeaserSource>> {
  if (!manifestRequest) {
    manifestRequest = fetch(asset("videos/manifest.json"))
      .then((response) => (response.ok ? (response.json() as Promise<Manifest>) : { teasers: {} }))
      .then((manifest) => manifest.teasers ?? {})
      .catch(() => ({}));
  }
  return manifestRequest;
}

export interface TeaserState {
  source: TeaserSource | null;
  resolved: boolean;
}

export function useTeaser(artistId: string): TeaserState {
  const [state, setState] = useState<TeaserState>({ source: null, resolved: false });

  useEffect(() => {
    let active = true;
    setState({ source: null, resolved: false });

    loadManifest().then((teasers) => {
      if (active) setState({ source: teasers[artistId] ?? null, resolved: true });
    });

    return () => {
      active = false;
    };
  }, [artistId]);

  return state;
}
