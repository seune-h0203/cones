import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { CustomCursor } from "./components/CustomCursor";
import { EasterEgg } from "./components/EasterEgg";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";

// Route-level code splitting — the homepage bundle stays small.
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const ProductDetail = lazy(() => import("./pages/shop/ProductDetail"));
const Cart = lazy(() => import("./pages/shop/Cart"));
const Checkout = lazy(() => import("./pages/shop/Checkout"));
const OrderComplete = lazy(() => import("./pages/shop/OrderComplete"));
const MyOrders = lazy(() => import("./pages/shop/MyOrders"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));

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

declare global {
  interface Window {
    __CONES_BASE__?: string;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter basename={window.__CONES_BASE__ ?? "/"}>
          <a href="#main" className="u-skip">
            본문 바로가기
          </a>

          <div className="u-grain" aria-hidden="true" />
          <LoadingScreen />
          <CustomCursor />
          <EasterEgg />

          <Navbar />

          <main id="main">
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:id" element={<OrderComplete />} />
                <Route path="/mypage/orders" element={<MyOrders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
