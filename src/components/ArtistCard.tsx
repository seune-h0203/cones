import { Link } from "react-router-dom";
import type { Artist } from "../data/artists";
import { UNITS } from "../data/site";
import { asset } from "../utils/asset";
import styles from "./ArtistCard.module.css";

interface Props {
  artist: Artist;
  /** first visible panel loads eagerly, the rest lazily */
  priority?: boolean;
}

export function ArtistCard({ artist, priority = false }: Props) {
  return (
    <Link
      to={`/artists/${artist.id}`}
      className={styles.card}
      data-cursor="view"
      aria-label={`${artist.stageName} 프로필 보기`}
    >
      <div className={styles.media}>
        <img
          className={`u-photo ${styles.image}`}
          src={asset(artist.images.portrait)}
          srcSet={`${asset(artist.images.portraitSmall)} 520w, ${asset(artist.images.portrait)} 800w`}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
          alt={`${artist.stageName} (${artist.koreanName})`}
          style={{ objectPosition: artist.objectPosition }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
        <span className={styles.sweep} aria-hidden="true" />
      </div>

      <div className={styles.meta}>
        <span className={`u-mono ${styles.index}`}>ARTIST {artist.index}</span>
        <h3 className={`u-display ${styles.name}`}>{artist.stageName}</h3>

        <div className={styles.tags}>
          <span className={`u-mono ${styles.unit}`}>{UNITS[artist.unit].name}</span>
          <span className={`u-mono ${styles.ability}`}>{artist.ability}</span>
        </div>

        <span className={`u-mono ${styles.view}`}>
          VIEW PROFILE <span className="u-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}
