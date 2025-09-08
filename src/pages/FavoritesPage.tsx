import "./FavoritesPage.css";
import { Helmet } from "react-helmet";

import React from "react";
import { getFavorites, toggleFavorite } from "../favorites";
import { Link } from "react-router-dom";
import type { ICocktail } from "../types";
import Button from "../components/Button";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = React.useState<ICocktail[]>(getFavorites());

  const handleRemove = (id: string) => {
    const cocktail = favorites.find(c => c.id === id);
    if (cocktail) {
      toggleFavorite(cocktail);
      setFavorites(getFavorites());
    }
  };

  return (
    <>
      <Helmet>
        <title>Favoriter | Cocktail Wiki</title>
        <meta name="description" content="Dina sparade favoritdrinkar och cocktails." />
      </Helmet>
  <div className="page-card">
      {favorites.length === 0 ? (
        <p>Inga favoriter än.</p>
      ) : (
        <ul className="unstyled-list" aria-label="Lista över favoriter">
          {favorites.map(cocktail => (
            <li key={cocktail.id} className="card-list-item">
              <span style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, maxWidth: 400, overflow: 'hidden' }}>
                <img
                  src={cocktail.thumbnail}
                  alt={cocktail.name}
                  style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover', boxShadow: '0 2px 8px #e0e7ef', marginRight: 18, flexShrink: 0, background: '#fff' }}
                  loading="lazy"
                  aria-label={`Bild på ${cocktail.name}`}
                />
                <div style={{ minWidth: 0 }}>
                  <Link to={`/cocktail/${cocktail.id}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600, fontSize: 18, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }} aria-label={`Visa info om ${cocktail.name}`}>{cocktail.name}</Link>
                  <span style={{ color: '#888', fontSize: 14, fontWeight: 400 }}>{cocktail.category}</span>
                </div>
              </span>
              <Button
                danger
                style={{ marginLeft: 12, padding: '6px 16px', whiteSpace: 'nowrap' }}
                onClick={() => handleRemove(cocktail.id)}
                aria-label={`Ta bort ${cocktail.name} från favoriter`}
              >
                Ta bort
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default FavoritesPage;
