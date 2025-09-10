import './FavoritesPage.css';
import { Helmet } from 'react-helmet';

import React from 'react';
import { getFavorites, toggleFavorite } from '../favorites';
import { Link } from 'react-router-dom';
import type { ICocktail } from '../types';
import Button from '../components/Button';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = React.useState<ICocktail[]>(getFavorites());

  const handleRemove = (id: string) => {
    const cocktail = favorites.find((c) => c.id === id);
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
            {favorites.map((cocktail) => (
              <li key={cocktail.id} className="card-list-item">
                <span className="favorites-list-item-content">
                  <Link
                    to={`/cocktail/${cocktail.id}`}
                    aria-label={`Visa info om ${cocktail.name}`}
                    className="favorites-list-img-link"
                  >
                    <img
                      src={cocktail.thumbnail}
                      alt={cocktail.name}
                      className="favorites-list-img"
                      loading="lazy"
                      aria-label={`Bild på ${cocktail.name}`}
                    />
                  </Link>
                  <div style={{ minWidth: 0 }}>
                    <Link
                      to={`/cocktail/${cocktail.id}`}
                      className="favorites-list-name-link"
                      aria-label={`Visa info om ${cocktail.name}`}
                    >
                      {cocktail.name}
                    </Link>
                    <span className="favorites-list-category">
                      {cocktail.category}
                    </span>
                  </div>
                </span>
                <Button
                  danger
                  className="favorites-remove-btn"
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
