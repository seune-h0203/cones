import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ARTISTS } from "../data/artists";
import { SITE, UNITS, type UnitInfo } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { ConnectionSequence } from "../components/ConnectionSequence";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { SystemCycle } from "../components/SystemCycle";
import styles from "./World.module.css";

function UnitRoster({ unit, index }: { unit: UnitInfo; index: string }) {
  const members = ARTISTS.filter((artist) => artist.unit === unit.id);

  return (
    <section className={`u-section ${styles.section}`}>
      <div className="u-container">
        <SectionHeader index={index} kicker={unit.mandate} title={unit.name} lead={unit.description} />
        <div className={styles.roster}>
          {members.map((artist, i) => (
            <Reveal key={artist.id} delay={i * 120}>
              <Link to={`/artists/${artist.id}`} className={styles.member} data-cursor="view">
                <div className={styles.memberMedia}>
                  <img
                    className={`u-photo ${styles.memberImage}`}
                    src={asset(artist.images.portraitSmall)}
                    alt={`${artist.stageName} (${artist.koreanName})`}
                    style={{ objectPosition: artist.objectPosition }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.memberBody}>
                  <p className="u-kicker">ARTIST {artist.index}</p>
                  <p className={`u-display ${styles.memberName}`}>{artist.stageName}</p>
                  <p className={`u-display ${styles.memberAbility}`}>{artist.ability}</p>
                  <p className={styles.memberLine}>{artist.abilityLine}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function World() {
  useSeo({
    title: "CONES — WORLD",
    description:
      "TWO ORIGINS. ONE SYSTEM. AI UNIT은 판단하고 COMPUTER UNIT은 실행한다. LEARN → PREDICT → DESIGN → EXECUTE → ∞",
    image: "images/og/default.jpg",
  });

  useEffect(() => {
    track("page_view", { page: "world" });
    track("world_view");
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="u-container">
          <p className="u-kicker">WORLD</p>
          <h1 className={`u-display ${styles.heroTitle}`}>
            TWO ORIGINS.
            <br />
            <span className="u-chrome">ONE SYSTEM.</span>
          </h1>
          <p className={`u-lead ${styles.heroLead}`}>
            CONES는 두 개의 기원에서 출발한다. 하나는 해석하고, 하나는 만든다.
            연결되었을 때에만 시스템은 작동한다.
          </p>
        </div>
      </header>

      {/* ---------- 01 TWO ORIGINS ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="01" kicker="ORIGINS" title="TWO ORIGINS" />
          <div className={styles.origins}>
            {[UNITS.ai, UNITS.computer].map((unit, i) => (
              <Reveal key={unit.id} className={styles.originCard} delay={i * 140}>
                <p className={`u-mono ${styles.originIndex}`}>{unit.origin}</p>
                <p className={`u-display ${styles.originName}`}>{unit.name}</p>
                <p className={`u-mono ${styles.originMandate}`}>{unit.mandate}</p>
                <p className={styles.originBody}>{unit.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 02 / 03 UNITS ---------- */}
      <UnitRoster unit={UNITS.ai} index="02" />
      <UnitRoster unit={UNITS.computer} index="03" />

      {/* ---------- 04 CONNECTION ---------- */}
      <section className={styles.connection}>
        <div className="u-container">
          <SectionHeader
            index="04"
            kicker={SITE.project}
            title="O + O → ∞"
            lead="두 개의 원이 겹치는 순간, 시스템이 태어난다."
            align="center"
          />
        </div>
        <ConnectionSequence />
      </section>

      {/* ---------- 05 THE SYSTEM ---------- */}
      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader
            index="05"
            kicker="THE SYSTEM"
            title="LEARN → PREDICT → DESIGN → EXECUTE"
            lead="네 개의 능력은 끝나지 않고 서로에게 되돌아간다. 그래서 시스템은 ∞ 이다."
          />
          <SystemCycle />
          <Reveal className={styles.systemFoot}>
            <Link to="/artists" className="u-btn u-btn--primary">
              MEET THE ARTISTS <span className="u-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
