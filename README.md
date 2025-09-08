# Cocktail Wiki

A playful, modern cocktail wiki built with React, Vite, and TypeScript. Discover, search, and save your favorite drinks from TheCocktailDB – with a tropical twist!

## Features
- Search and browse cocktails from TheCocktailDB
- Save favorites locally
- Write and view reviews for each drink
- Modern, responsive design with glassmorphism and tropical gradients
- Playful palm tree and coconut animation (coconuts persist across navigation and reload)
- Accessibility: semantic HTML, keyboard navigation, ARIA labels
- Modular, maintainable codebase with component-specific CSS

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure
- `src/components/` – Reusable UI components (NavButton, CoconutPile, SVGs, etc)
- `src/pages/` – Page components for routing
- `src/global.css` – Global styles and variables
- Component-specific CSS for maintainability
- `src/components/CoconutContext.tsx` – Global coconut state (with localStorage persistence)

## Credits
- [TheCocktailDB](https://www.thecocktaildb.com/) for drink data
- Palm/coconut SVGs and playful UI by Pinten84

## License
MIT
