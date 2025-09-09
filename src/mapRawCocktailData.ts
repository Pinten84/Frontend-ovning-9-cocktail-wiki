import type { ICocktail, RawCocktail } from './types';

export function mapRawCocktailData(rawCocktail: RawCocktail): ICocktail {
  return {
    id: rawCocktail.idDrink,
    name: rawCocktail.strDrink,
    tags: rawCocktail.strTags ? rawCocktail.strTags.split(',') : [],
    category: rawCocktail.strCategory,
    alcoholic: rawCocktail.strAlcoholic === 'Alcoholic',
    glass: rawCocktail.strGlass,
    instructions: rawCocktail.strInstructions,
    thumbnail: rawCocktail.strDrinkThumb,
    ingredients: Array.from({ length: 15 })
      .map((_, i) => {
        const ingredient = rawCocktail[`strIngredient${i + 1}`];
        const measure = rawCocktail[`strMeasure${i + 1}`];
        if (!ingredient) return null;
        return {
          ingredient: ingredient,
          measure: measure ?? null,
        };
      })
      .filter((item): item is { ingredient: string; measure: string | null } => !!item),
  };
}
