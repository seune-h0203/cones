import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { EasterEgg } from "./components/EasterEgg";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { PageTransition, ScrollToTop } from "./components/PageTransition";

// Route-level code splitting — the homepage bundle stays small.
const Home = lazy(() => import("./pages/Home"));
const World = lazy(() => import("./pages/World"));
const Artists = lazy(() => import("./pages/Artists"));
const ArtistDetail = lazy(() => import("./pages/ArtistDetail"));
const Project = lazy(() => import("./pages/Project"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
    /* Hash routing keeps deep links refresh-safe on static hosts such as GitHub Pages. */
    <HashRouter>
      <ScrollToTop />
      <a href="#main" className="u-skip">
        본문 바로가기
      </a>

      <div className="u-grain" aria-hidden="true" />
      <LoadingScreen />
      <PageTransition />
      <CustomCursor />
      <EasterEgg />

      <Navbar />

      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/world" element={<World />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:artistId" element={<ArtistDetail />} />
            <Route path="/project" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </HashRouter>
  );
}
