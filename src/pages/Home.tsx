import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ARTISTS } from "../data/artists";
import { DEBUT_LABEL, SITE, UNITS } from "../data/site";
import { useCountdown } from "../hooks/useCountdown";
import { DEBUT_DATE } from "../data/site";
import { usePointerFine, useReducedMotion } from "../hooks/useMedia";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { ArtistCard } from "../components/ArtistCard";
import { ConnectionSequence } from "../components/ConnectionSequence";
import { Countdown } from "../components/Countdown";
import { LogoMark } from "../components/LogoMark";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { SystemCycle } from "../components/SystemCycle";
import { VideoModal } from "../components/VideoModal";
import styles from "./Home.module.css";

export default function Home() {
  const [teaserOpen, setTeaserOpen] = useState(false);
  const { isLive } = useCountdown(DEBUT_DATE);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);

  useSeo({
    title: "CONES — TWO ORIGINS, ONE SYSTEM.",
    description: `${SITE.description} DEBUT SHOWCASE ${DEBUT_LABEL}.`,
    image: "images/og/default.jpg",
  });

  useEffect(() => {
    track("page_view", { page: "home" });
    track("countdown_view", { target: DEBUT_LABEL });
  }, []);

  useEffect(() => {
    if (!pointerFine || reducedMotion) return;
    const node = heroRef.current;
    if (!node) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      node.style.setProperty("--px", `${x}px`);
      node.style.setProperty("--py", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * 26;
      y = (event.clientY / window.innerHeight - 0.5) * 18;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pointerFine, reducedMotion]);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={`u-kicker ${styles.heroKicker}`}>{SITE.projectLabel}</p>

          <h1 className={styles.heroTitle}>
            <LogoMark
              alt={SITE.name}
              className={styles.heroLogo}
              shine
              glow
              reveal
              revealDelay={280}
            />
          </h1>

          <p className={`u-display ${styles.heroTagline}`}>
            TWO ORIGINS. <span className="u-chrome">ONE SYSTEM.</span>
          </p>

          <div className={styles.heroDebut}>
            <p className="u-kicker">DEBUT SHOWCASE — {DEBUT_LABEL}</p>
            <Countdown variant="hero" />
          </div>

          <div className={styles.heroActions}>
            <Link to="/world" className="u-btn u-btn--primary">
              ENTER THE SYSTEM <span className="u-arrow">→</span>
            </Link>
            <button type="button" className="u-btn" onClick={() => setTeaserOpen(true)} data-cursor="play">
              WATCH TEASER <span className="u-arrow">→</span>
            </button>
          </div>
        </div>

        <span className={`u-mono ${styles.scrollCue}`} aria-hidden="true">
          SCROLL
        </span>
      </section>

      {/* ---------- 01 DEBUT ---------- */}
      <section className={`u-section ${styles.debut}`}>
        <div className="u-container">
          <SectionHeader
            index="01"
            kicker="DEBUT"
            title={isLive ? "CONNECTION : 00 IS LIVE" : "COUNTDOWN TO CONNECTION"}
            lead={
              isLive
                ? "두 개의 기원이 하나의 시스템으로 연결되었다. CONNECTION : 00 — NOW LIVE."
                : "CONES의 첫 번째 프로젝트가 공개되는 날. 시스템은 이미 카운트다운에 들어갔다."
            }
          />
          <Reveal className={styles.debutPanel}>
            <div className={styles.debutDate}>
              <p className="u-kicker">DEBUT SHOWCASE</p>
              <p className={`u-display ${styles.debutValue}`}>{DEBUT_LABEL}</p>
            </div>
            <div className={styles.debutTimer}>
              <Countdown variant="hero" />
              <p className={`u-mono ${styles.debutStatus}`}>
                {isLive ? "CONNECTION : 00 — NOW LIVE" : "CONNECTION : 00 — COMING SOON"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- 02 TWO ORIGINS ---------- */}
      <section className={`u-section ${styles.origins}`}>
        <div className="u-container">
          <SectionHeader
            index="02"
            kicker="TWO ORIGINS"
            title="THINK. BUILD."
            lead="AI UNIT은 판단하고, COMPUTER UNIT은 실행한다. 어느 한쪽만으로는 시스템이 완성되지 않는다."
          />

          <div className={styles.originGrid}>
            {[UNITS.ai, UNITS.computer].map((unit, i) => (
              <Reveal key={unit.id} className={styles.originCard} delay={i * 120}>
                <p className="u-kicker">{unit.origin}</p>
                <h3 className={`u-display ${styles.originTitle}`}>{unit.name}</h3>
                <p className={`u-mono ${styles.originMandate}`}>{unit.mandate}</p>
                <p className={styles.originBody}>{unit.description}</p>
                <ul className={styles.originArtists}>
                  {ARTISTS.filter((artist) => artist.unit === unit.id).map((artist) => (
                    <li key={artist.id}>
                      <Link to={`/artists/${artist.id}`} className={styles.originArtistLink}>
                        <span className="u-display">{artist.stageName}</span>
                        <span className={`u-mono ${styles.originAbility}`}>{artist.ability}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <SystemCycle />
        </div>
      </section>

      {/* ---------- 03 ARTISTS ---------- */}
      <section className={`u-section ${styles.artists}`}>
        <div className="u-container">
          <SectionHeader index="03" kicker="ARTISTS" title="FOUR MINDS." lead="04 ARTISTS · 02 UNITS" />
        </div>
        <div className={styles.artistGrid}>
          {ARTISTS.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} priority={i === 0} />
          ))}
        </div>
        <div className={`u-container ${styles.artistsFoot}`}>
          <Link to="/artists" className="u-btn">
            ALL ARTISTS <span className="u-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* ---------- 04 CONNECTION : 00 ---------- */}
      <section className={styles.connection}>
        <div className="u-container">
          <SectionHeader
            index="04"
            kicker="CONNECTION : 00"
            title="O + O → ∞"
            lead="두 개의 원. 하나의 연결. 스크롤하면 시스템이 만들어진다."
            align="center"
          />
        </div>
        <ConnectionSequence />
      </section>

      {/* ---------- 05 PROJECT ---------- */}
      <section className={`u-section ${styles.project}`}>
        <div className="u-container">
          <SectionHeader index="05" kicker="PROJECT" title="CONNECTION : 00" />
          <Reveal className={styles.projectPanel}>
            <p className="u-lead">
              CONES의 첫 번째 공식 프로젝트. 서로 다른 두 기원이 하나의 시스템으로 연결되는
              과정을 기록한다. 00은 두 개의 원이자, 아직 아무것도 정해지지 않은 시작점이다.
            </p>
            <Link to="/project" className="u-btn">
              VIEW PROJECT <span className="u-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- 06 FINAL ---------- */}
      <section className={styles.final}>
        <div className={`u-container ${styles.finalInner}`}>
          <Reveal>
            <LogoMark alt={SITE.name} className={styles.finalLogo} shine loading="lazy" />
            <p className={`u-kicker ${styles.finalTagline}`}>{SITE.tagline}</p>
            <div className={styles.finalActions}>
              <Link to="/artists" className="u-btn u-btn--primary">
                MEET THE ARTISTS <span className="u-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <VideoModal
        open={teaserOpen}
        onClose={() => setTeaserOpen(false)}
        subject={{
          id: "project",
          title: SITE.project,
          meta: "CONES OFFICIAL",
          poster: "images/og/default.jpg",
        }}
      />
    </>
  );
}
