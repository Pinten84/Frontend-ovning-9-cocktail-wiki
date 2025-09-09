import React from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  name: string;
}

interface Props {
  items: Item[];
}

const CocktailList: React.FC<Props> = ({ items }) => (
  <ul className="cocktail-list" aria-label="Lista över drinkar">
    {items.map((item) => (
      <li key={item.id} className="cocktail-item">
        <Link
          to={`/cocktail/${item.id}`}
          className="cocktail-link"
          aria-label={`Visa info om ${item.name}`}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default CocktailList;
