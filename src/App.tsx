import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CocktailInfoPage from "./pages/CocktailInfoPage";
import FavoritesPage from "./pages/FavoritesPage";
import IngredientPage from "./pages/IngredientPage";
import CenteredCardLayout from "./components/CenteredCardLayout";
import NavButton from "./components/NavButton";



const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(120deg, #f9d29d 0%, #ffd6e0 40%, #a1c4fd 100%)",
  fontFamily: "Inter, Segoe UI, Arial, sans-serif",
  color: "#222",
  width: "100vw",
  boxSizing: "border-box",
  overflowX: "hidden",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0,
  padding: "0",
  justifyContent: "center",
  alignItems: "stretch",
  background: "linear-gradient(90deg, #fbbf24 0%, #f9d29d 50%, #a1c4fd 100%)",
  borderBottom: "2px solid #fbbf24",
  marginBottom: 24,
  fontWeight: 800,
  fontSize: 21,
  letterSpacing: 1.5,
  boxShadow: "0 2px 12px #fbbf2455",
  minHeight: 64,
  fontFamily: 'Montserrat, Inter, Segoe UI, Arial, sans-serif',
};



const App: React.FC = () => {
  return (
    <Router>
      <div style={mainStyle}>
        <header style={{ textAlign: "center", marginTop: 40, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <h1
                style={{
                  fontFamily: 'Pacifico, cursive',
                  fontSize: 54,
                  margin: 0,
                  letterSpacing: 2.5,
                  color: "#fbbf24",
                  textShadow: "2px 2px 0 #2b3a55, 0 2px 8px #a1c4fd99",
                  display: "inline-block",
                  textTransform: "uppercase"
                }}
              >
                Cocktail Wiki
              </h1>
              <span style={{ fontSize: 54, color: "#fbbf24", marginTop: 2, textShadow: "2px 2px 0 #2b3a55" }} role="img" aria-label="drink">🍹</span>
            </Link>
          </div>
          <p style={{
            color: "#4b5563",
            fontSize: 17,
            margin: "18px 0 36px 0",
            fontWeight: 400,
            letterSpacing: 0.2,
            fontStyle: "italic",
            textShadow: "none"
          }}>
            Upptäck, sök och spara dina favoritdrinkar från <span style={{ fontWeight: 600, color: "#2563eb", textShadow: "none", fontStyle: "normal" }}>The Cocktail DB</span>
          </p>
        </header>
        <nav style={navStyle}>
          <NavButton to="/">Hem</NavButton>
          <NavButton to="/search">Sök</NavButton>
          <NavButton to="/favorites">Favoriter</NavButton>
        </nav>
  {/* Background image only on landing page */}
        <div style={{ position: "relative" }}>
          <Routes>
            <Route path="/" element={
              <CenteredCardLayout title="Random Cocktail">
                <LandingPage />
              </CenteredCardLayout>
            } />
            <Route path="/search" element={
              <CenteredCardLayout title="Sök drinkar">
                <SearchPage />
              </CenteredCardLayout>
            } />
            <Route path="/cocktail/:id" element={
              <CenteredCardLayout title="Drinkinfo">
                <CocktailInfoPage />
              </CenteredCardLayout>
            } />
            <Route path="/favorites" element={
              <CenteredCardLayout title="Favoriter">
                <FavoritesPage />
              </CenteredCardLayout>
            } />
            <Route path="/ingredient/:name" element={
              <CenteredCardLayout title="Ingrediens">
                <IngredientPage />
              </CenteredCardLayout>
            } />
          </Routes>
        </div>
        <footer style={{ textAlign: "center", margin: "48px 0 16px 0", color: "#888" }}>
          <small>Byggd med React, Vite &amp; TheCocktailDB.com API</small>
        </footer>
      </div>
    </Router>
  );
};

export default App;
