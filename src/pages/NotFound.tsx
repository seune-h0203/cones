import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import styles from "./pages.module.css";

export default function NotFound() {
  useSeo({
    title: "CONES — SYSTEM NOT FOUND",
    description: "요청한 경로를 찾을 수 없습니다.",
    image: "images/og/default.jpg",
  });

  return (
    <div className={styles.notFound}>
      <p className={`u-mono ${styles.notFoundCode}`}>404</p>
      <h1 className={`u-display ${styles.notFoundTitle}`}>SYSTEM NOT FOUND</h1>
      <p className={`u-lead ${styles.notFoundLead}`}>
        연결이 존재하지 않는 경로입니다. 시스템으로 돌아가세요.
      </p>
      <Link to="/" className="u-btn u-btn--primary">
        RETURN TO CONES <span className="u-arrow">→</span>
      </Link>
    </div>
  );
}
