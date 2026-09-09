import type { Artist } from "../data/artists";
import { DEBUT_LABEL, SITE, UNITS } from "../data/site";
import { useTeaser } from "../hooks/useTeaser";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { TeaserVideo } from "./TeaserVideo";
import styles from "./Teaser.module.css";

interface Props {
  artist: Artist;
  onOpenModal: () => void;
}

/**
 * Teaser surface for an artist. Renders the real teaser when one has been
 * delivered, and a branded pre-release poster state when it has not.
 */
export function TeaserPlayer({ artist, onOpenModal }: Props) {
  const { source, resolved } = useTeaser(artist.id);
  const label = source?.label ?? "TEASER 01";

  return (
    <div className={styles.stage}>
      {source ? (
        <TeaserVideo
          source={source}
          poster={artist.images.wide}
          title={`${artist.stageName} ${label}`}
          onPlay={() => track("teaser_play", { artist: artist.id })}
          onComplete={() => track("teaser_complete", { artist: artist.id })}
        />
      ) : (
        <div className={styles.pending}>
          <img
            className={`u-photo ${styles.pendingImage}`}
            src={asset(artist.images.wide)}
            alt={`${artist.stageName} 티저 포스터`}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.pendingBody}>
            <p className={`u-kicker ${styles.pendingKicker}`}>
              {resolved ? "TEASER — SIGNAL PENDING" : "TEASER — LOADING"}
            </p>
            <p className={`u-display ${styles.pendingName}`}>{artist.stageName}</p>
            <p className={`u-mono ${styles.pendingMeta}`}>
              {UNITS[artist.unit].name} · {artist.ability}
            </p>
            <button type="button" className="u-btn u-btn--primary" onClick={onOpenModal} data-cursor="play">
              PLAY TEASER <span className="u-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      <div className={styles.overlayMeta} aria-hidden="true">
        <span className="u-mono">{label}</span>
        <span className="u-mono">{SITE.project}</span>
        <span className="u-mono">{DEBUT_LABEL}</span>
      </div>
    </div>
  );
}
