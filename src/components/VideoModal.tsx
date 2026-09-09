import { useEffect, useRef } from "react";
import { DEBUT_LABEL } from "../data/site";
import { useFocusTrap, useScrollLock } from "../hooks/useFocusTrap";
import { useTeaser } from "../hooks/useTeaser";
import { track } from "../utils/analytics";
import { asset } from "../utils/asset";
import { TeaserVideo } from "./TeaserVideo";
import styles from "./Teaser.module.css";

export interface TeaserSubject {
  /** manifest key — an artist id, or "project" for the campaign teaser */
  id: string;
  title: string;
  meta: string;
  /** public-relative poster path */
  poster: string;
}

interface Props {
  subject: TeaserSubject;
  open: boolean;
  onClose: () => void;
}

export function VideoModal({ subject, open, onClose }: Props) {
  const { source } = useTeaser(subject.id);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useScrollLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const label = source?.label ?? "TEASER 01";

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={`${subject.title} 티저`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.modalPanel} ref={panelRef}>
        <div className={styles.modalHead}>
          <div>
            <p className={`u-mono ${styles.modalName}`}>{subject.title}</p>
            <p className="u-kicker">
              {subject.meta} · {label}
            </p>
          </div>
          <button type="button" className={`u-mono ${styles.modalClose}`} onClick={onClose}>
            CLOSE ✕
          </button>
        </div>

        {source ? (
          <TeaserVideo
            source={source}
            poster={subject.poster}
            title={`${subject.title} ${label}`}
            autoInView={false}
            onPlay={() => track("teaser_play", { subject: subject.id, surface: "modal" })}
            onComplete={() => track("teaser_complete", { subject: subject.id, surface: "modal" })}
          />
        ) : (
          <div className={styles.modalPending}>
            <img
              className={styles.modalPendingImage}
              src={asset(subject.poster)}
              alt={`${subject.title} 티저 포스터`}
            />
            <div className={styles.modalPendingBody}>
              <p className={`u-display ${styles.modalPendingTitle}`}>SIGNAL PENDING</p>
              <p className={`u-mono ${styles.modalPendingMeta}`}>
                {subject.title} TEASER · {DEBUT_LABEL}
              </p>
              <p className={styles.modalPendingNote}>
                티저 영상은 DEBUT SHOWCASE 일정에 맞춰 공개됩니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
