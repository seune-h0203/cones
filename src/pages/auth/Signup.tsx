import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "../shop/shop.module.css";

export default function Signup() {
  useSeo({ title: "CONES — SIGN UP", description: "CONES 계정 만들기." });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signUpError } = await signUp(email, password);
    setSubmitting(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className={pageStyles.page}>
        <div className="u-container">
          <p className={styles.notice}>
            가입 확인 메일을 보냈습니다. 메일함을 확인한 뒤{" "}
            <button type="button" className={styles.backLink} onClick={() => navigate("/login")}>
              로그인
            </button>
            해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">CONES ACCOUNT</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>SIGN UP</h1>
        </div>
      </header>

      <section className={`u-section ${pageStyles.section}`}>
        <div className="u-container">
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <label className={styles.formField}>
              <span className="u-mono">EMAIL</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
            <label className={styles.formField}>
              <span className="u-mono">PASSWORD (6자 이상)</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </label>
            {error && <p className={styles.notice}>{error}</p>}
            <button type="submit" className="u-btn u-btn--primary" disabled={submitting}>
              {submitting ? "SIGNING UP…" : "SIGN UP"} <span className="u-arrow">-&gt;</span>
            </button>
          </form>
          <p className={styles.footnote}>
            이미 계정이 있으신가요? <Link to="/login">LOG IN →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
