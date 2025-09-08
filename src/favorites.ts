import type { ICocktail } from "./types";

export function getFavorites(): ICocktail[] {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
}

export function saveFavorites(favs: ICocktail[]) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some(c => c.id === id);
}

export function toggleFavorite(cocktail: ICocktail) {
  const favs = getFavorites();
  const exists = favs.some(c => c.id === cocktail.id);
  if (exists) {
    saveFavorites(favs.filter(c => c.id !== cocktail.id));
  } else {
    saveFavorites([...favs, cocktail]);
  }
}
