import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ABILITY_COPY, profileFields, type Artist } from "../data/artists";
import { UNITS } from "../data/site";
import { useFocusTrap, useScrollLock } from "../hooks/useFocusTrap";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { AbilityMotif } from "./AbilityMotif";
import { VideoModal } from "./VideoModal";
import styles from "./ArtistProfileModal.module.css";

export function ArtistProfileModal({ artist, onClose }: { artist: Artist | null; onClose: () => void }) {
  const [teaserOpen, setTeaserOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useScrollLock(Boolean(artist));
  useFocusTrap(Boolean(artist), panelRef);

  useEffect(() => {
    if (!artist) return;
    track("artist_view", { artist: artist.id, surface: "landing" });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [artist, onClose]);

  if (!artist) return null;
  const unit = UNITS[artist.unit];
  const ability = ABILITY_COPY[artist.ability];

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={`${artist.stageName} profile`}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={styles.panel} ref={panelRef}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close profile">
          CLOSE X
        </button>
        <div className={styles.identity}>
          <img
            className={styles.image}
            src={asset(artist.images.portrait)}
            alt={`${artist.stageName} (${artist.koreanName})`}
            style={{ objectPosition: artist.objectPosition }}
          />
          <div className={styles.heading}>
            <p className="u-kicker">ARTIST {artist.index} / {unit.name}</p>
            <h2 className={`u-display ${styles.name}`}>{artist.stageName}</h2>
            <p className={`u-mono ${styles.ability}`}>{artist.ability} · {artist.position}</p>
            <p className={styles.quote}>{artist.sentence}</p>
            <div className={styles.actions}>
              <button type="button" className="u-btn u-btn--primary" onClick={() => setTeaserOpen(true)}>
                PLAY TEASER <span className="u-arrow">-&gt;</span>
              </button>
              <Link className="u-btn" to={`/shop?artist=${artist.id}`} onClick={onClose}>
                OFFICIAL MD <span className="u-arrow">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div>
            <AbilityMotif ability={artist.ability} />
            <p className={`u-mono ${styles.abilityLine}`}>{artist.abilityLine}</p>
          </div>
          <div>
            <p className={`u-kicker ${styles.detailKicker}`}>{ability.title}</p>
            <p className={styles.body}>{ability.body}</p>
            <dl className={styles.profile}>
              {profileFields(artist).map((field) => (
                <div key={field.label}>
                  <dt className="u-mono">{field.label}</dt>
                  <dd>{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <VideoModal
        open={teaserOpen}
        onClose={() => setTeaserOpen(false)}
        subject={{ id: artist.id, title: artist.stageName, meta: `${unit.name} · ${artist.ability}`, poster: artist.images.wide }}
      />
    </div>
  );
}
