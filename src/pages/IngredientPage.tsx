import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './IngredientPage.css';

interface Ingredient {
  id: string;
  name: string;
  description: string;
  type: string;
  isAlcohol: boolean;
  abv: string | null;
}

interface Drink {
  id: string;
  name: string;
}

const IngredientPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError('');
    Promise.all([
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${encodeURIComponent(name)}`
      ).then((res) => res.json()),
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(name)}`
      ).then((res) => res.json()),
    ])
      .then(([ingData, drinkData]) => {
        const ing = ingData.ingredients?.[0];
        if (ing) {
          setIngredient({
            id: ing.idIngredient,
            name: ing.strIngredient,
            description: ing.strDescription || '',
            type: ing.strType || '',
            isAlcohol: ing.strAlcohol === 'Yes',
            abv: ing.strABV || null,
          });
        }
  setDrinks((drinkData.drinks || []).map((d: import('../types').DrinkApi) => ({ id: d.idDrink, name: d.strDrink })));
      })
      .catch(() => setError('Failed to fetch ingredient info.'))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!ingredient) return <p>No ingredient found.</p>;

  return (
    <>
      <Helmet>
        <title>
          {ingredient ? `${ingredient.name} | Cocktail Wiki` : 'Ingrediens | Cocktail Wiki'}
        </title>
        <meta
          name="description"
          content={ingredient ? `Drinkar med ${ingredient.name}.` : 'Drinkar per ingrediens.'}
        />
      </Helmet>
      <div className="page-card">
        <Link
          to="/search"
          className="custom-btn ingredient-back-link"
          aria-label="Tillbaka till sök"
        >
          <span aria-hidden="true" className="ingredient-back-arrow">
            👈
          </span>
          Tillbaka till sök
        </Link>
        <h2 className="page-title">{ingredient.name}</h2>
        <p>
          <b>Typ:</b> {ingredient.type}
        </p>
        <p>
          <b>Alkohol:</b> {ingredient.isAlcohol ? 'Ja' : 'Nej'}
        </p>
        {ingredient.abv && (
          <p>
            <b>ABV:</b> {ingredient.abv}%
          </p>
        )}
        {ingredient.description && (
          <p>
            <b>Beskrivning:</b> {ingredient.description}
          </p>
        )}
        <h4 className="section-title">Drinkar med denna ingrediens</h4>
        <ul className="unstyled-list">
          {drinks.map((d) => (
            <li key={d.id} style={{ marginBottom: 4 }}>
              <Link to={`/cocktail/${d.id}`} className="cocktail-link">
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IngredientPage;
