import { sanitizeInput } from '../sanitizeInput';
import { Helmet } from 'react-helmet';
import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import { mapRawCocktailData } from '../mapRawCocktailData';
import type { ICocktail } from '../types';
import CocktailList from '../components/CocktailList';
import './SearchPage.css';

const PAGE_SIZE = 10;

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [glass, setGlass] = useState('');
  const [results, setResults] = useState<ICocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [glasses, setGlasses] = useState<string[]>([]);
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
  .then((data) => setCategories(data.drinks?.map((d: import('../types').CategoryApi) => d.strCategory) || []));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
      .then((res) => res.json())
  .then((data) => setGlasses(data.drinks?.map((d: import('../types').GlassApi) => d.strGlass) || []));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json())
  .then((data) => setIngredientList(data.drinks?.map((d: import('../types').IngredientApi) => d.strIngredient1) || []));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    setPage(1);
    try {
      // Bygg cache-nyckel
      const cacheKey = `search_${query}_${ingredient}_${category}_${glass}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setResults(JSON.parse(cached));
        setLoading(false);
        return;
      }

      let cocktails: ICocktail[] = [];

      // Fritextsök
      if (query.trim()) {
        const url =
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + encodeURIComponent(query);
        const res = await fetch(url);
        const data = await res.json();
        cocktails = data.drinks ? data.drinks.map(mapRawCocktailData) : [];

        // Filtrera på ingrediens
        if (ingredient.trim()) {
          const resIng = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
          );
          const dataIng = await resIng.json();
          const ids = new Set((dataIng.drinks || []).map((d: import('../types').DrinkApi) => d.idDrink));
          cocktails = cocktails.filter((c) => ids.has(c.id));
        }
        // Filtrera på kategori
        if (category) {
          cocktails = cocktails.filter((c) => c.category === category);
        }
        // Filtrera på glastyp
        if (glass) {
          cocktails = cocktails.filter((c) => c.glass === glass);
        }
      } else if (ingredient || category || glass) {
        // Endast filter, ingen fritext
        const idSets: Array<Set<string>> = [];
  let baseList: import('../types').DrinkApi[] | null = null;

        if (ingredient) {
          const resIng = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
          );
          const dataIng = await resIng.json();
          if (!dataIng.drinks) dataIng.drinks = [];
          idSets.push(new Set(dataIng.drinks.map((d: import('../types').DrinkApi) => d.idDrink)));
          if (!baseList) baseList = dataIng.drinks;
        }
        if (category) {
          const resCat = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
          );
          const dataCat = await resCat.json();
          if (!dataCat.drinks) dataCat.drinks = [];
          idSets.push(new Set(dataCat.drinks.map((d: import('../types').DrinkApi) => d.idDrink)));
          if (!baseList) baseList = dataCat.drinks;
        }
        if (glass) {
          const resGlass = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${encodeURIComponent(glass)}`
          );
          const dataGlass = await resGlass.json();
          if (!dataGlass.drinks) dataGlass.drinks = [];
          idSets.push(new Set(dataGlass.drinks.map((d: import('../types').DrinkApi) => d.idDrink)));
          if (!baseList) baseList = dataGlass.drinks;
        }
        // Intersektera idSets
        const filtered = (baseList || []).filter((d: import('../types').DrinkApi) =>
          idSets.every((set) => set.has(d.idDrink))
        );
        // Hämta drinkdetaljer
        const cocktailResults = await Promise.all(
          filtered.map(async (d: import('../types').DrinkApi) => {
            const res = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${d.idDrink}`
            );
            const data = await res.json();
            return data.drinks ? mapRawCocktailData(data.drinks[0]) : null;
          })
        );
        cocktails = cocktailResults.filter((c): c is ICocktail => Boolean(c));
      }

      if (!cocktails || cocktails.length === 0) {
        setError('No cocktails found.');
      }
      setResults(cocktails);
      localStorage.setItem(cacheKey, JSON.stringify(cocktails));
    } catch {
      setError('Failed to fetch cocktails.');
    } finally {
      setLoading(false);
    }
  };

  const paginatedResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);

  // Sortera listor alfabetiskt
  const sortedIngredients = [...ingredientList].sort((a, b) => a.localeCompare(b, 'sv'));
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b, 'sv'));
  const sortedGlasses = [...glasses].sort((a, b) => a.localeCompare(b, 'sv'));

  return (
    <>
      <Helmet>
        <title>Sök drinkar | Cocktail Wiki</title>
        <meta
          name="description"
          content="Sök bland tusentals drinkar och cocktails. Filtrera på ingrediens, kategori och glastyp."
        />
      </Helmet>
      <div className="page-card">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(sanitizeInput(e.target.value, 40))}
            placeholder="Namn på drink"
            className="search-input"
            maxLength={40}
          />
          <div className="search-row">
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="search-select search-select-ingredient"
            >
              <option value="">Välj ingrediens</option>
              {sortedIngredients.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="search-select"
          >
            <option value="">Alla kategorier</option>
            {sortedCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            className="search-select"
          >
            <option value="">Alla glastyper</option>
            {sortedGlasses.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <Button
            type="submit"
            disabled={loading || (!query.trim() && !ingredient.trim() && !category && !glass)}
          >
            Sök
          </Button>
        </form>
        {loading && <p className="search-loading">Laddar...</p>}
        {error && <p className="error-text">{error}</p>}
        <CocktailList items={paginatedResults.map((c) => ({ id: c.id, name: c.name }))} />
        {totalPages > 1 && (
          <div className="search-pagination">
            <Button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="search-pagination-btn"
            >
              Föregående
            </Button>
            <span className="search-pagination-info">
              Sida {page} av {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="search-pagination-btn"
            >
              Nästa
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
