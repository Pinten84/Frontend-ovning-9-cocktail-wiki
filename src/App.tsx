import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CoconutProvider } from "./components/CoconutContext";

import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import CocktailInfoPage from "./pages/CocktailInfoPage";
import FavoritesPage from "./pages/FavoritesPage";
import IngredientPage from "./pages/IngredientPage";
import CenteredCardLayout from "./components/CenteredCardLayout";
import NavButton from "./components/NavButton";
import RealPalmSVG from "./components/svg/RealPalmSVG";
import CoconutPile from "./components/CoconutPile";
import { useRef } from "react";


const App: React.FC = () => {

  // Drop coconut by calling CoconutPile's global function
  // Only drop a coconut every N clicks (N random 1-4)
  const clickCount = useRef(0);
  const dropEvery = useRef(Math.floor(Math.random() * 4) + 1); // 1-4
  function handleGlobalClick() {
    clickCount.current++;
    if (clickCount.current >= dropEvery.current) {
      if (typeof window !== "undefined" && (window as any).dropCoconut) {
        (window as any).dropCoconut();
      }
      clickCount.current = 0;
      dropEvery.current = Math.floor(Math.random() * 4) + 1;
    }
  }

  return (
    <CoconutProvider>
      <Router>
        <div className="main" onClick={handleGlobalClick} style={{ position: 'relative', minHeight: '100vh' }}>
          <header className="header">
            <div className="header-row">
              <Link to="/" className="logo-link" aria-label="Gå till startsidan">
                      <h1 className="logo-title">Cocktail Wiki</h1>
                <span className="emoji" role="img" aria-label="drink">🍹</span>
              </Link>
            </div>
            <p className="slogan">
              Upptäck, sök och spara dina favoritdrinkar från <span className="slogan-source">The Cocktail DB</span>
            </p>
          </header>
          <nav className="nav" aria-label="Huvudnavigation">
            <NavButton to="/" aria-label="Gå till startsidan">
              <span className="nav-btn-content">Hem <span aria-hidden="true" style={{fontSize: '1.2em', marginLeft: 2}}>🏠</span></span>
            </NavButton>
            <NavButton to="/search" aria-label="Sök efter drinkar">
              <span className="nav-btn-content">Sök <span aria-hidden="true" style={{fontSize: '1.2em', marginLeft: 2}}>🔍</span></span>
            </NavButton>
            <NavButton to="/favorites" aria-label="Visa favoriter">
              <span className="nav-btn-content">Favoriter <span aria-hidden="true" style={{fontSize: '1.2em', marginLeft: 2}}>⭐</span></span>
            </NavButton>
          </nav>
    <main className="relative" tabIndex={-1} id="main-content">
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
          </main>
          <footer className="footer">
            <small>Byggd med React, Vite &amp; TheCocktailDB.com API</small>
          </footer>
          <RealPalmSVG className="global-palm medium-palm" />
          <CoconutPile />
        </div>
      </Router>
    </CoconutProvider>
  );
};

export default App;
