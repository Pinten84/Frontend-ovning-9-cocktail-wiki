import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { mapRawCocktailData } from '../mapRawCocktailData';
import type { ICocktail } from '../types';
import CocktailCard from '../components/CocktailCard';
import Button from '../components/Button';

const LandingPage: React.FC = () => {
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch a random cocktail
  const fetchRandomCocktail = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.drinks && data.drinks.length > 0) {
        setCocktail(mapRawCocktailData(data.drinks[0]));
      } else {
        setError('No cocktail found.');
      }
    } catch {
      setError('Failed to fetch cocktail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return (
    <>
      <Helmet>
        <title>Hem | Cocktail Wiki</title>
        <meta
          name="description"
          content="Upptäck slumpmässiga drinkar och cocktails. Spara dina favoriter och hitta nya recept!"
        />
      </Helmet>
      {loading && <p className="search-loading">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {cocktail && (
        <CocktailCard id={cocktail.id} name={cocktail.name} thumbnail={cocktail.thumbnail} />
      )}
      <Button onClick={fetchRandomCocktail} disabled={loading}>
        Hämta ny slumpad cocktail{' '}
        <span role="img" aria-label="tärning" className="landing-dice">
          🎲
        </span>
      </Button>
    </>
  );
};

export default LandingPage;
