import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ARTISTS } from "../data/artists";
import { COMPANY, DEBUT_LABEL, SITE, UNITS } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./pages.module.css";

export default function About() {
  useSeo({
    title: "CONES — ABOUT / TEAM 02",
    description: "TEAM 02. FOUR MINDS. ONE SYSTEM. CONES를 만드는 네 사람.",
    image: "images/og/default.jpg",
  });

  useEffect(() => {
    track("page_view", { page: "about" });
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="u-container">
          <p className="u-kicker">ABOUT — TEAM 02</p>
          <h1 className={`u-display ${styles.heroTitle}`}>
            FOUR MINDS.
            <br />
            <span className="u-chrome">ONE SYSTEM.</span>
          </h1>
          <p className={`u-lead ${styles.heroLead}`}>
            CONES는 TEAM 02가 만드는 아티스트 프로젝트다. 기획, 디자인, 마케팅, 실행 —
            네 사람의 역할이 그대로 네 개의 ABILITY가 되었다.
          </p>
        </div>
      </header>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="01" kicker="TEAM 02" title="THE MEMBERS" />
          <ul className={styles.team}>
            {ARTISTS.map((artist, i) => (
              <li key={artist.id}>
                <Reveal delay={i * 90}>
                  <Link to={`/artists/${artist.id}`} className={styles.teamRow} data-cursor="view">
                    <img
                      className={`u-photo ${styles.teamImage}`}
                      src={asset(artist.images.portraitSmall)}
                      alt={`${artist.stageName} (${artist.koreanName})`}
                      style={{ objectPosition: artist.objectPosition }}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.teamName}>
                      <span className={`u-display ${styles.teamStage}`}>{artist.stageName}</span>
                      <span className={`u-mono ${styles.teamKorean}`}>{artist.koreanName}</span>
                    </span>
                    <span className={`u-mono ${styles.teamRole}`}>{artist.position}</span>
                    <span className={`u-mono ${styles.teamUnit}`}>
                      {UNITS[artist.unit].name} · {artist.ability}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="02" kicker="LEADERSHIP" title={COMPANY.role} compact />
          <Reveal className={styles.leadership}>
            <p className={`u-display ${styles.leadershipName}`}>{COMPANY.name}</p>
            <p className={`u-mono ${styles.leadershipRole}`}>{COMPANY.role} — CONES</p>
          </Reveal>
        </div>
      </section>

      <section className={`u-section ${styles.section}`}>
        <div className="u-container">
          <SectionHeader index="03" kicker="PROJECT" title={SITE.project} />
          <Reveal className={styles.aboutFoot}>
            <p className="u-lead">
              첫 번째 프로젝트 CONNECTION : 00은 두 기원이 하나의 시스템으로 연결되는 과정을
              기록한다. DEBUT SHOWCASE는 {DEBUT_LABEL}.
            </p>
            <div className={styles.aboutActions}>
              <Link to="/project" className="u-btn">
                VIEW PROJECT <span className="u-arrow">→</span>
              </Link>
              <Link to="/world" className="u-btn">
                ENTER THE WORLD <span className="u-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
