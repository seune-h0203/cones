import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DEBUT_DATE, DEBUT_LABEL, SITE, UNITS } from "../data/site";
import { useCountdown } from "../hooks/useCountdown";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { Countdown } from "../components/Countdown";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./pages.module.css";

const SEQUENCE = [
  { symbol: "O    O", caption: "TWO ORIGINS" },
  { symbol: "O + O", caption: "CONNECTION" },
  { symbol: "∞", caption: "ONE SYSTEM" },
];

export default function Project() {
  const { isLive } = useCountdown(DEBUT_DATE);

  useSeo({
    title: "CONES — PROJECT : CONNECTION : 00",
    description: `CONES 첫 번째 프로젝트 CONNECTION : 00. O + O → ∞ → CONES. DEBUT SHOWCASE ${DEBUT_LABEL}.`,
    image: "images/og/default.jpg",
  });

  useEffect(() => {
    track("page_view", { page: "project" });
    track("project_view", { project: "connection-00" });
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="u-container">
          <p className="u-kicker">PROJECT</p>
          <h1 className={`u-display ${styles.heroTitle}`}>
            CONNECTION <span className="u-chrome">: 00</span>
          </h1>
          <p className={`u-mono ${styles.heroMeta}`}>
            {isLive ? "NOW LIVE" : "COMING SOON"} — {DEBUT_LABEL}
          </p>
        </div>
      </header>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="01" kicker="THE SEQUENCE" title="O + O → ∞ → CONES" />
          <div className={styles.sequence}>
            {SEQUENCE.map((step, i) => (
              <Reveal key={step.caption} className={styles.sequenceStep} delay={i * 160}>
                <span className={`u-mono ${styles.sequenceSymbol}`}>{step.symbol}</span>
                <span className="u-kicker">{step.caption}</span>
              </Reveal>
            ))}
            <Reveal className={styles.sequenceStep} delay={480}>
              <img
                src={asset("images/cones-logo.png")}
                alt={SITE.name}
                className={styles.sequenceLogo}
                loading="lazy"
              />
              <span className="u-kicker">CONES</span>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="02" kicker="CONCEPT" title="00 IS TWO CIRCLES" />
          <div className={styles.split}>
            <Reveal>
              <p className="u-lead">
                00은 두 개의 원이다. AI UNIT과 COMPUTER UNIT, 서로 다른 두 기원이 아직 아무것도
                정해지지 않은 상태로 마주 선다. 그 둘이 겹치는 자리에서 시스템이 시작된다.
              </p>
            </Reveal>
            <Reveal delay={140} className={styles.originList}>
              {[UNITS.ai, UNITS.computer].map((unit) => (
                <div key={unit.id} className={styles.originRow}>
                  <span className={`u-mono ${styles.originIndex}`}>{unit.origin}</span>
                  <span className={`u-display ${styles.originName}`}>{unit.name}</span>
                  <span className={`u-mono ${styles.originMandate}`}>{unit.mandate}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="03" kicker="DEBUT SHOWCASE" title={isLive ? "NOW LIVE" : DEBUT_LABEL} />
          <Reveal className={styles.debut}>
            {!isLive && <Countdown variant="hero" />}
            <Link to="/artists" className="u-btn u-btn--primary">
              MEET THE ARTISTS <span className="u-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
