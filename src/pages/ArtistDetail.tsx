import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ABILITY_COPY,
  getArtist,
  getNeighbours,
  getUnitPartner,
  profileFields,
} from "../data/artists";
import { DEBUT_LABEL, SITE, UNITS } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { AbilityMotif } from "../components/AbilityMotif";
import { Countdown } from "../components/Countdown";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { TeaserPlayer } from "../components/TeaserPlayer";
import { VideoModal } from "../components/VideoModal";
import NotFound from "./NotFound";
import styles from "./ArtistDetail.module.css";

export default function ArtistDetail() {
  const { artistId } = useParams();
  const artist = getArtist(artistId);
  const [teaserOpen, setTeaserOpen] = useState(false);

  useEffect(() => {
    if (artist) track("artist_view", { artist: artist.id });
  }, [artist]);

  useSeo({
    title: artist ? `${artist.stageName} — CONES` : "CONES — SYSTEM NOT FOUND",
    description: artist
      ? `${artist.stageName} (${artist.koreanName}) · ${UNITS[artist.unit].name} · ${artist.ability}. CONES DEBUT SHOWCASE ${DEBUT_LABEL}.`
      : SITE.description,
    image: artist ? artist.images.og : "images/og/default.jpg",
  });

  if (!artist) return <NotFound />;

  const unit = UNITS[artist.unit];
  const partner = getUnitPartner(artist);
  const { prev, next } = getNeighbours(artist.id);
  const ability = ABILITY_COPY[artist.ability];

  return (
    <article className={styles.page}>
      {/* ---------- HERO ---------- */}
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <img
            className={`u-photo-color ${styles.heroImage}`}
            src={asset(artist.images.portrait)}
            srcSet={`${asset(artist.images.portraitSmall)} 520w, ${asset(artist.images.portrait)} 800w`}
            sizes="(max-width: 900px) 100vw, 52vw"
            alt={`${artist.stageName} (${artist.koreanName})`}
            style={{ objectPosition: artist.objectPosition }}
            decoding="async"
          />
        </div>

        <div className={styles.heroBody}>
          <p className={`u-kicker ${styles.heroKicker}`}>
            ARTIST {artist.index} — {SITE.name}
          </p>
          <h1 className={`u-display ${styles.heroName}`}>{artist.stageName}</h1>
          <p className={styles.heroKorean}>{artist.koreanName}</p>

          <div className={styles.heroTags}>
            <span className={`u-mono ${styles.tag}`}>{unit.name}</span>
            <span className={`u-mono ${styles.tagStrong}`}>{artist.ability}</span>
          </div>

          <blockquote className={styles.heroQuote}>“{artist.sentence}”</blockquote>

          <button
            type="button"
            className="u-btn u-btn--primary"
            onClick={() => setTeaserOpen(true)}
            data-cursor="play"
          >
            PLAY TEASER <span className="u-arrow">→</span>
          </button>
        </div>
      </header>

      {/* ---------- 01 TEASER ---------- */}
      <section className={`u-section ${styles.section}`} id="teaser">
        <div className="u-container">
          <SectionHeader index="01" kicker="TEASER" title={`${artist.stageName} TEASER`} />
          <Reveal>
            <TeaserPlayer artist={artist} onOpenModal={() => setTeaserOpen(true)} />
          </Reveal>
        </div>
      </section>

      {/* ---------- 02 PROFILE ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="02" kicker="PROFILE" title="ARTIST FILE" />
          <Reveal>
            <dl className={styles.profile}>
              {profileFields(artist).map((field) => (
                <div className={styles.profileRow} key={field.label}>
                  <dt className={`u-mono ${styles.profileLabel}`}>{field.label}</dt>
                  <dd className={styles.profileValue}>{field.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- 03 ABILITY ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="03" kicker="ABILITY" title={artist.ability} />
          <div className={styles.abilityGrid}>
            <Reveal>
              <AbilityMotif ability={artist.ability} />
            </Reveal>
            <Reveal delay={120} className={styles.abilityBody}>
              <h3 className={`u-display ${styles.abilityTitle}`}>{ability.title}</h3>
              <p className="u-lead">{ability.body}</p>
              <p className={`u-mono ${styles.abilityLine}`}>{artist.abilityLine}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- 04 UNIT ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="04" kicker="UNIT" title={unit.name} />
          <Reveal className={styles.unitPanel}>
            <div>
              <p className={`u-mono ${styles.unitMandate}`}>{unit.mandate}</p>
              <p className="u-lead">{unit.description}</p>
            </div>
            {partner && (
              <Link to={`/artists/${partner.id}`} className={styles.partner} data-cursor="view">
                <img
                  className={`u-photo ${styles.partnerImage}`}
                  src={asset(partner.images.portraitSmall)}
                  alt={partner.stageName}
                  style={{ objectPosition: partner.objectPosition }}
                  loading="lazy"
                />
                <span className={styles.partnerBody}>
                  <span className="u-kicker">SAME UNIT</span>
                  <span className={`u-display ${styles.partnerName}`}>{partner.stageName}</span>
                  <span className={`u-mono ${styles.partnerAbility}`}>{partner.ability}</span>
                </span>
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- 05 DEBUT ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="05" kicker="DEBUT" title="DEBUT SHOWCASE" />
          <Reveal className={styles.debut}>
            <p className={`u-display ${styles.debutDate}`}>{DEBUT_LABEL}</p>
            <Countdown variant="hero" />
          </Reveal>
        </div>
      </section>

      {/* ---------- 06 NEXT ARTIST ---------- */}
      <nav className={styles.neighbours} aria-label="아티스트 이동">
        {[
          { artist: prev, direction: "PREVIOUS ARTIST", arrow: "←" },
          { artist: next, direction: "NEXT ARTIST", arrow: "→" },
        ].map((item) => (
          <Link
            key={item.direction}
            to={`/artists/${item.artist.id}`}
            className={styles.neighbour}
            data-cursor="view"
            data-align={item.arrow === "←" ? "start" : "end"}
          >
            <img
              className={`u-photo ${styles.neighbourImage}`}
              src={asset(item.artist.images.portraitSmall)}
              alt=""
              style={{ objectPosition: item.artist.objectPosition }}
              loading="lazy"
              aria-hidden="true"
            />
            <span className={styles.neighbourBody}>
              <span className="u-kicker">
                {item.arrow === "←" && `${item.arrow} `}
                {item.direction}
                {item.arrow === "→" && ` ${item.arrow}`}
              </span>
              <span className={`u-display ${styles.neighbourName}`}>{item.artist.stageName}</span>
              <span className={`u-mono ${styles.neighbourAbility}`}>{item.artist.ability}</span>
            </span>
          </Link>
        ))}
      </nav>

      <VideoModal
        open={teaserOpen}
        onClose={() => setTeaserOpen(false)}
        subject={{
          id: artist.id,
          title: artist.stageName,
          meta: `${unit.name} · ${artist.ability}`,
          poster: artist.images.wide,
        }}
      />
    </article>
  );
}
