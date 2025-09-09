export interface IIngredient {
  ingredient: string;
  measure: string | null;
}

export interface ICocktail {
  id: string;
  name: string;
  tags: string[];
  category: string;
  alcoholic: boolean;
  glass: string;
  instructions: string;
  thumbnail: string;
  ingredients: IIngredient[];
}

export interface RawCocktail {
  idDrink: string;
  strDrink: string;
  strTags?: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string | undefined;
}

export interface DrinkApi {
  idDrink: string;
  strDrink: string;
}

export interface CategoryApi {
  strCategory: string;
}

export interface GlassApi {
  strGlass: string;
}

export interface IngredientApi {
  strIngredient1: string;
}
