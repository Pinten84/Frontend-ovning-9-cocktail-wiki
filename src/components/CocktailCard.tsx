import React from "react";
import { Link } from "react-router-dom";
import "./CocktailCard.css";

interface Props {
  id: string;
  name: string;
  thumbnail: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonDisabled?: boolean;
}

const CocktailCard: React.FC<Props> = ({ id, name, thumbnail, buttonText, onButtonClick, buttonDisabled }) => (
  <div className="cocktail-card">
    <Link to={`/cocktail/${id}`} className="cocktail-card-link" aria-label={`Visa mer info om ${name}`}> 
      <img
        src={thumbnail}
        alt={name}
        className="cocktail-card-img"
        loading="lazy"
      />
      <div className="cocktail-card-title">{name}</div>
    </Link>
    <button
      className="cocktail-card-main-btn"
      onClick={() => window.location.href = `/cocktail/${id}`}
      disabled={buttonDisabled}
      aria-label={`Mer info om ${name}`}
    >
      Mer info <span role="img" aria-label="drink" className="cocktail-card-drinkicon">🍸</span>
    </button>
    {buttonText && (
      <button
        className="cocktail-card-extra-btn"
        onClick={onButtonClick}
        disabled={buttonDisabled}
        aria-label={buttonText}
      >
        {buttonText}
      </button>
    )}
  </div>
);

export default CocktailCard;
