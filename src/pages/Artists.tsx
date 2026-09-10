import { useEffect, useState } from "react";
import { ARTISTS } from "../data/artists";
import { UNITS } from "../data/site";
import { useSeo } from "../hooks/useSeo";
import { track } from "../utils/analytics";
import { ArtistCard } from "../components/ArtistCard";
import { SectionHeader } from "../components/SectionHeader";
import styles from "./Artists.module.css";

type Filter = "all" | "ai" | "computer";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "ai", label: "AI UNIT" },
  { id: "computer", label: "COMPUTER UNIT" },
];

export default function Artists() {
  const [filter, setFilter] = useState<Filter>("all");

  useSeo({
    title: "CONES — ARTISTS",
    description: "CONES ARTISTS. 04 ARTISTS · 02 UNITS. SERINA, BAESAN, HYUN JIZEL, HAM BOM.",
    image: "images/og/default.jpg",
  });

  useEffect(() => {
    track("page_view", { page: "artists" });
  }, []);

  const visible = ARTISTS.filter((artist) => filter === "all" || artist.unit === filter);

  return (
    <section className={styles.page}>
      <div className="u-container">
        <SectionHeader
          kicker="MEMBERS"
          title="ARTISTS"
          lead="04 ARTISTS · 02 UNITS"
          level={1}
          compact
        />

        <div className={styles.controls}>
          <div className={styles.filters} role="group" aria-label="유닛 필터">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`u-mono ${styles.filter}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className={`u-mono ${styles.count}`} aria-live="polite">
            {visible.length.toString().padStart(2, "0")} / {ARTISTS.length.toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className={styles.grid} data-count={visible.length}>
        {visible.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} priority={i < 2} />
        ))}
      </div>

      <div className={`u-container ${styles.units}`}>
        {[UNITS.ai, UNITS.computer].map((unit) => (
          <div key={unit.id} className={styles.unitBlock}>
            <p className="u-kicker">{unit.origin}</p>
            <h2 className={`u-display ${styles.unitName}`}>{unit.name}</h2>
            <p className={`u-mono ${styles.unitMandate}`}>{unit.mandate}</p>
            <p className={styles.unitBody}>{unit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
