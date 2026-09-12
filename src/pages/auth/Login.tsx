import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSeo } from "../../hooks/useSeo";
import pageStyles from "../pages.module.css";
import styles from "../shop/shop.module.css";

export default function Login() {
  useSeo({ title: "CONES — LOGIN", description: "CONES 계정으로 로그인." });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/shop";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) setError(signInError);
    else navigate(from, { replace: true });
  };

  return (
    <div className={pageStyles.page}>
      <header className={pageStyles.hero}>
        <div className="u-container">
          <p className="u-kicker">CONES ACCOUNT</p>
          <h1 className={`u-display ${pageStyles.heroTitle}`}>LOGIN</h1>
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
              <span className="u-mono">PASSWORD</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            {error && <p className={styles.notice}>{error}</p>}
            <button type="submit" className="u-btn u-btn--primary" disabled={submitting}>
              {submitting ? "LOGGING IN…" : "LOG IN"} <span className="u-arrow">-&gt;</span>
            </button>
          </form>
          <p className={styles.footnote}>
            계정이 없으신가요? <Link to="/signup">SIGN UP →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
