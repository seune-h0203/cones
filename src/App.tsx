import { lazy, Suspense } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { EasterEgg } from "./components/EasterEgg";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";

// Route-level code splitting — the homepage bundle stays small.
const Home = lazy(() => import("./pages/Home"));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: "70svh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <p className="u-kicker">LOADING…</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a href="#main" className="u-skip">
        본문 바로가기
      </a>

      <div className="u-grain" aria-hidden="true" />
      <LoadingScreen />
      <CustomCursor />
      <EasterEgg />

      <Navbar />

      <main id="main">
        <Suspense fallback={<RouteFallback />}><Home /></Suspense>
      </main>

      <Footer />
    </>
  );
}
