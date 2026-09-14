import { useEffect, useRef, useState } from "react";
import { getArtist, type Artist } from "../data/artists";
import { SITE } from "../data/site";
import { asset } from "../utils/asset";
import { LogoMark } from "./LogoMark";
import styles from "./IntroSequence.module.css";

type SceneId = "opening" | "baesan" | "rina" | "hyun-jizel" | "ham-bom" | "rapidcut" | "four" | "cones";

/**
 * Single source of truth for the whole choreography: every scene's start
 * time lives here, nowhere else. The CSS only reacts to `data-scene`; it
 * never owns a duration or a delay for *when* a scene begins.
 */
const SCENE_TIMELINE: { id: SceneId; at: number }[] = [
  { id: "opening", at: 0 },
  { id: "baesan", at: 400 },
  { id: "rina", at: 1100 },
  { id: "hyun-jizel", at: 1800 },
  { id: "ham-bom", at: 2500 },
  { id: "rapidcut", at: 3200 },
  { id: "four", at: 3500 },
  { id: "cones", at: 4100 },
];

/** BAESAN -> SERINA -> HYUN JIZEL -> HAM BOM, reusing each artist's own
 * existing image set + face-safe objectPosition (see data/artists.ts) —
 * nothing here duplicates an image path. */
const MEMBER_IDS = ["baesan", "rina", "hyun-jizel", "ham-bom"] as const;
const MEMBERS = MEMBER_IDS.map((id) => getArtist(id)).filter((artist): artist is Artist => Boolean(artist));

function bigName(artist: Artist) {
  return artist.stageName.replace(/\s+/g, "");
}

export function IntroSequence({ onSkip, exiting }: { onSkip: () => void; exiting: boolean }) {
  const [scene, setScene] = useState<SceneId>("opening");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current = SCENE_TIMELINE.slice(1).map(({ id, at }) => window.setTimeout(() => setScene(id), at));
    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, []);

  const handleSkip = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setScene("cones");
    window.setTimeout(onSkip, 220);
  };

  return (
    <div className={styles.stage} data-scene={scene} data-exiting={exiting}>
      <div className={styles.openingFlash} aria-hidden="true" />
      <div className={styles.metalLine} aria-hidden="true" />

      {MEMBERS.map((artist) => (
        <figure key={artist.id} className={styles.member} data-role={artist.id} aria-hidden="true">
          <div className={styles.memberImgWrap}>
            <img
              className={styles.memberImg}
              src={asset(artist.images.wide)}
              style={{ objectPosition: artist.objectPosition }}
              alt=""
              loading="eager"
              decoding="async"
            />
            <span className={styles.memberSweep} />
          </div>
          <span className={`u-display ${styles.memberBg}`}>{bigName(artist)}</span>
          <span className={`u-mono ${styles.memberIndex}`}>
            {artist.index} / {artist.stageName}
          </span>
          <h2 className={`u-display ${styles.memberName}`}>{bigName(artist)}</h2>
        </figure>
      ))}

      <div className={styles.rapidCut} aria-hidden="true">
        {MEMBERS.map((artist) => (
          <img
            key={artist.id}
            className={styles.rapidImg}
            src={asset(artist.images.wide)}
            style={{ objectPosition: artist.objectPosition }}
            alt=""
            loading="eager"
            decoding="async"
          />
        ))}
      </div>

      <div className={styles.quad} aria-hidden="true">
        {MEMBERS.map((artist) => (
          <div key={artist.id} className={styles.quadPanel} data-role={artist.id}>
            <img
              src={asset(artist.images.wide)}
              style={{ objectPosition: artist.objectPosition }}
              alt=""
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
        <div className={styles.quadCaption}>
          <p className={`u-display ${styles.quadLine} ${styles.quadLineA}`}>DIFFERENT ONES</p>
          <p className={`u-display ${styles.quadLine} ${styles.quadLineB}`}>CONNECTED AS ONE</p>
        </div>
      </div>

      <div className={styles.finale} aria-hidden="true">
        <div className={styles.bootMark}>
          <svg className={styles.orbit} viewBox="0 0 400 200" role="presentation" focusable="false">
            <g className={styles.circles}>
              <circle className={`${styles.circle} ${styles.circleLeft}`} cx="150" cy="100" r="26" />
              <circle className={`${styles.circle} ${styles.circleRight}`} cx="250" cy="100" r="26" />
            </g>
            <path
              className={styles.spark}
              d="M200 82 L206 96 L220 100 L206 104 L200 118 L194 104 L180 100 L194 96 Z"
            />
            <g className={styles.infinity}>
              <path
                className={styles.infinityTrack}
                pathLength="1"
                d="M160,100 C160,70 190,70 200,100 C210,130 240,130 240,100 C240,70 210,70 200,100 C190,130 160,130 160,100 Z"
              />
              <path
                className={styles.infinityLight}
                pathLength="1"
                d="M160,100 C160,70 190,70 200,100 C210,130 240,130 240,100 C240,70 210,70 200,100 C190,130 160,130 160,100 Z"
              />
            </g>
          </svg>
        </div>
        <span className={styles.finaleLogoStage}>
          <LogoMark alt={SITE.name} className={styles.finaleLogo} shine reveal revealDelay={1040} />
        </span>
        <p className={`u-mono ${styles.finaleTagline}`}>DIFFERENT ONES, CONNECTED AS ONE</p>
      </div>

      <button type="button" className={`u-mono ${styles.skip}`} onClick={handleSkip}>
        SKIP <span aria-hidden="true">&gt;&gt;</span>
      </button>
    </div>
  );
}
