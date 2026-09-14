import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ARTISTS, type Artist } from "../data/artists";
import { COMPANY, DEBUT_DATE, DEBUT_LABEL, GROUP_MD_POSTER, SITE, UNITS } from "../data/site";
import { useCountdown } from "../hooks/useCountdown";
import { usePointerFine, useReducedMotion } from "../hooks/useMedia";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { ArtistCard } from "../components/ArtistCard";
import { ArtistProfileModal } from "../components/ArtistProfileModal";
import { BackgroundMusic } from "../components/BackgroundMusic";
import { ConnectionSequence } from "../components/ConnectionSequence";
import { Countdown } from "../components/Countdown";
import { LogoMark } from "../components/LogoMark";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { SystemCycle } from "../components/SystemCycle";
import { VideoModal } from "../components/VideoModal";
import styles from "./Home.module.css";

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const { isLive } = useCountdown(DEBUT_DATE);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useSeo({
    title: "CONES — TWO ORIGINS, ONE SYSTEM.",
    description: "CONES is an interactive project connecting four minds, two origins, and one system.",
    image: "images/og/default.jpg",
  });

  useEffect(() => { track("page_view", { page: "landing" }); }, []);

  useEffect(() => {
    if (!pointerFine || reducedMotion || !heroRef.current) return;
    const node = heroRef.current;
    const onMove = (event: PointerEvent) => {
      node.style.setProperty("--px", `${(event.clientX / window.innerWidth - 0.5) * 26}px`);
      node.style.setProperty("--py", `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerFine, reducedMotion]);

  return (
    <>
      <section className={styles.hero} ref={heroRef} aria-labelledby="hero-title">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={`u-kicker ${styles.heroKicker}`}>{SITE.projectLabel}</p>
          <h1 className={styles.heroTitle} id="hero-title"><span className={styles.heroLogoStage}><LogoMark alt={SITE.name} className={styles.heroLogo} shine glow reveal revealDelay={280} /></span></h1>
          <p className={`u-display ${styles.heroTagline}`}>TWO ORIGINS. <span className="u-chrome">ONE SYSTEM.</span></p>
          <p className={`u-mono ${styles.heroSubline}`}>FOUR MINDS. TWO ORIGINS. ONE SYSTEM.</p>
          <div className={styles.heroDebut}><p className="u-kicker">DEBUT SHOWCASE — {DEBUT_LABEL}</p><Countdown variant="hero" /></div>
          <div className={styles.heroActions}>
            <a href="#origins" className="u-btn u-btn--primary">SCROLL TO CONNECT <span className="u-arrow">-&gt;</span></a>
            <button type="button" className="u-btn" onClick={() => setTeaserOpen(true)} data-cursor="play">WATCH TEASER <span className="u-arrow">-&gt;</span></button>
          </div>
        </div>
        <span className={`u-mono ${styles.scrollCue}`}>SCROLL TO CONNECT</span>
      </section>

      <section className={`u-section ${styles.origins}`} id="origins">
        <div className="u-container">
          <SectionHeader index="01" kicker="ORIGINS" title="TWO ORIGINS." lead="두 개의 독립적인 기원이 서로 다른 방식으로 시스템을 시작한다." />
          <div className={styles.originGrid}>
            {[UNITS.ai, UNITS.computer].map((unit, i) => (
              <Reveal key={unit.id} className={styles.originCard} delay={i * 120}>
                <span className={styles.originSymbol} aria-hidden="true">O</span>
                <p className="u-kicker">{unit.origin}</p><h2 className={`u-display ${styles.originTitle}`}>{unit.name}</h2>
                <p className={`u-mono ${styles.originMandate}`}>{unit.mandate}</p><p className={styles.originBody}>{unit.description}</p>
                <ul className={styles.originArtists}>{ARTISTS.filter((artist) => artist.unit === unit.id).map((artist) => <li key={artist.id}><button type="button" className={styles.originArtistLink} onClick={() => setSelectedArtist(artist)}><span className="u-display">{artist.stageName}</span><span className={`u-mono ${styles.originAbility}`}>{artist.ability}</span></button></li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.connection} id="connection"><div className="u-container"><SectionHeader index="02" kicker="CONNECTION" title="O + O → ∞" lead="두 개의 원이 만나 하나의 연결이 되는 순간." align="center" /></div><ConnectionSequence /></section>

      <section className={`u-section ${styles.system}`} id="system"><div className="u-container"><SectionHeader index="03" kicker="SYSTEM CYCLE" title="LEARN → EXECUTE" lead="관측하고, 예측하고, 설계하고, 실행한다. 실행된 결과는 다시 학습으로 돌아간다." /><SystemCycle /></div></section>

      <section className={`u-section ${styles.artists}`} id="artists"><div className="u-container"><SectionHeader index="04" kicker="ARTISTS" title="FOUR MINDS." lead="각자의 ABILITY가 하나의 시스템을 완성한다." /></div><div className={styles.artistGrid}>{ARTISTS.map((artist, i) => <ArtistCard key={artist.id} artist={artist} priority={i === 0} onSelect={setSelectedArtist} />)}</div></section>

      <section className={`u-section ${styles.project}`} id="project"><div className="u-container"><SectionHeader index="05" kicker="CONNECTION : 00" title="NOW / NEXT" lead="00은 두 개의 원이자 아직 아무것도 정해지지 않은 상태다." /><Reveal className={styles.projectPanel}><p className="u-lead">CONES의 첫 번째 프로젝트는 두 기원이 하나의 시스템으로 연결되는 과정을 기록한다.</p><div className={styles.projectStatus}><p className="u-display">{isLive ? "NOW LIVE" : "COMING SOON"}</p><p className="u-mono">DEBUT SHOWCASE · {DEBUT_LABEL}</p></div><Countdown variant="inline" /></Reveal></div></section>

      <section className={`u-section ${styles.team}`} id="team"><div className="u-container"><SectionHeader index="06" kicker="TEAM 02" title="FOUR ROLES. ONE SYSTEM." lead="CONES의 팀은 시스템의 순환을 각자의 역할로 구현한다." /><div className={styles.teamGrid}>{ARTISTS.map((artist, i) => <Reveal key={artist.id} delay={i * 90} className={styles.teamCard}><span className="u-mono">0{i + 1} / {artist.ability}</span><strong className="u-display">{artist.stageName}</strong><span className="u-mono">{artist.position}</span><span className={styles.teamUnit}>{UNITS[artist.unit].name}</span></Reveal>)}</div></div></section>

      <section className={`u-section ${styles.director}`} id="director"><div className="u-container"><SectionHeader index="07" kicker="LEADERSHIP" title="DIRECTOR" compact /><Reveal className={styles.directorPanel}><div className={styles.directorMedia}><img className={styles.directorImage} src={asset("images/director-portrait.jpg")} srcSet={`${asset("images/director-portrait-sm.jpg")} 480w, ${asset("images/director-portrait.jpg")} 589w`} sizes="(max-width: 900px) 80vw, 38vw" alt={`${COMPANY.name} — ${COMPANY.role}`} loading="lazy" decoding="async" /></div><div className={styles.directorBody}><p className="u-kicker">DIRECTOR</p><p className={`u-display ${styles.directorName}`}>{COMPANY.name}</p><p className={`u-mono ${styles.directorRole}`}>{COMPANY.role} — CONES</p></div></Reveal></div></section>

      <section className={`u-section ${styles.shop}`} id="shop"><div className="u-container"><SectionHeader index="08" kicker="OFFICIAL MD" title="CONES × ALL" lead="네 사람의 순환이 만든 시스템을, 이제 손에 쥘 수 있는 형태로." /><Link className={styles.shopBanner} to="/shop" data-cursor="view"><img src={asset(GROUP_MD_POSTER)} alt="CONES OFFICIAL MD — GROUP CAMPAIGN" loading="lazy" decoding="async" /></Link><div className={styles.shopGrid}>{ARTISTS.map((artist) => <Link key={artist.id} className={styles.shopCard} to={`/shop?artist=${artist.id}`} data-cursor="view"><img src={asset(artist.images.md)} alt={`${artist.stageName} OFFICIAL MD`} loading="lazy" decoding="async" /><span className={`u-mono ${styles.shopCardLabel}`}>{artist.stageName} SHOP <span className="u-arrow">-&gt;</span></span></Link>)}</div></div></section>

      <section className={styles.final} id="cta"><div className={`u-container ${styles.finalInner}`}><Reveal><LogoMark alt={SITE.name} className={styles.finalLogo} shine loading="lazy" /><p className={`u-display ${styles.finalQuestion}`}>READY TO CONNECT?</p><p className={`u-kicker ${styles.finalTagline}`}>{SITE.tagline}</p><a href="#hero-title" className="u-btn u-btn--primary">ENTER CONES <span className="u-arrow">↑</span></a></Reveal></div></section>

      <ArtistProfileModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
      <VideoModal open={teaserOpen} onClose={() => setTeaserOpen(false)} subject={{ id: "project", title: SITE.project, meta: "CONES OFFICIAL", poster: "images/og/default.jpg" }} />
      <BackgroundMusic />
    </>
  );
}
