import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import './CocktailInfoPage.css';

import { mapRawCocktailData } from '../mapRawCocktailData';
import type { ICocktail } from '../types';
import { isFavorite, toggleFavorite } from '../favorites';
import Button from '../components/Button';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const CocktailInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  const [favorite, setFavorite] = useState(false);
  const [favAnim, setFavAnim] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAnim, setModalAnim] = useState(false);
  const [reviews, setReviews] = useState<{ name: string; rating: number; text: string }[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    setCocktail(null);
    const cacheKey = `cocktail_${id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const c = JSON.parse(cached);
      setCocktail(c);
      setFavorite(isFavorite(c.id));
      setLoading(false);
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.drinks && data.drinks.length > 0) {
            const c = mapRawCocktailData(data.drinks[0]);
            setCocktail(c);
            setFavorite(isFavorite(c.id));
            localStorage.setItem(cacheKey, JSON.stringify(c));
          } else {
            setError('No cocktail found.');
          }
        })
        .catch(() => setError('Failed to fetch cocktail.'))
        .finally(() => setLoading(false));
    }
    // Load reviews from localStorage
    const reviewKey = `reviews_${id}`;
    const saved = localStorage.getItem(reviewKey);
    setReviews(saved ? JSON.parse(saved) : []);
  }, [id]);

  const handleAddReview = (review: { name: string; rating: number; text: string }) => {
    const newReviews = [review, ...reviews];
    setReviews(newReviews);
    if (id) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(newReviews));
    }
  };

  if (loading) return <p className="cocktail-info-loading">Loading...</p>;
  if (error) return <p className="cocktail-info-error">{error}</p>;
  if (!cocktail) return null;

  const handleFavorite = () => {
    toggleFavorite(cocktail);
    setFavorite(isFavorite(cocktail.id));
    setFavAnim(true);
    setTimeout(() => setFavAnim(false), 350);
  };

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => setModalAnim(true), 10);
  };
  const closeModal = () => {
    setModalAnim(false);
    setTimeout(() => setShowModal(false), 200);
  };

  return (
    <>
      <Helmet>
        <title>{cocktail.name} | Cocktail Wiki</title>
        <meta
          name="description"
          content={`Recept, ingredienser och instruktioner för drinken ${cocktail.name}.`}
        />
      </Helmet>
      <div className="cocktail-info-card">
        {/* Back link */}
        <Link to="/search" className="cocktail-info-back">
          ← Tillbaka till sök
        </Link>
        {/* Overlay title on image */}
        <div className="cocktail-info-imgbox">
          <div className="cocktail-info-title-overlay">{cocktail.name}</div>
          <img
            src={cocktail.thumbnail}
            alt={cocktail.name}
            className="cocktail-info-img"
            onClick={openModal}
            loading="lazy"
          />
          <button
            onClick={openModal}
            className="cocktail-info-img-zoom-btn"
            aria-label={`Förstora bilden på ${cocktail.name}`}
          >
            🔍
          </button>
          {showModal && (
            <div className="cocktail-info-modal-bg" onClick={closeModal}>
              <img
                src={cocktail.thumbnail}
                alt={cocktail.name}
                className={
                  modalAnim
                    ? 'modal-anim-in cocktail-info-modal-img'
                    : 'modal-anim-out cocktail-info-modal-img'
                }
                onClick={closeModal}
                aria-label={`Förstorad bild på ${cocktail.name}`}
              />
            </div>
          )}
        </div>
        <div className="cocktail-info-btnrow">
          <Button
            onClick={handleFavorite}
            danger={favorite}
            className={favAnim ? 'pop-anim' : undefined}
            icon={
              <span aria-label={favorite ? 'Favorit' : 'Lägg till i favoriter'} role="img">
                {favorite ? '❤️' : '🤍'}
              </span>
            }
          >
            {favorite ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
          </Button>
          <Button
            onClick={() => {
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({
                  title: cocktail.name,
                  text: `Kolla in drinken ${cocktail.name}!`,
                  url,
                });
              } else {
                navigator.clipboard.writeText(url);
                alert('Länk kopierad!');
              }
            }}
            aria-label={`Dela ${cocktail.name}`}
            icon={
              <span aria-label="Dela" role="img">
                🔗
              </span>
            }
          >
            Dela
          </Button>
        </div>
        <div className="cocktail-info-meta">
          <div className="cocktail-info-meta-col">
            <p>
              <b>Kategori:</b> {cocktail.category}
            </p>
            <p>
              <b>Glas:</b> {cocktail.glass}
            </p>
            {cocktail.tags.length > 0 && (
              <p>
                <b>Taggar:</b> {cocktail.tags.join(', ')}
              </p>
            )}
          </div>
        </div>
        {/* Name below image */}
        <h3 className="cocktail-info-name">Namn: {cocktail.name}</h3>

        <h4 className="cocktail-info-ingredients-title">Ingredienser</h4>
        <ul className="cocktail-info-ingredients-list">
          {cocktail.ingredients.map((ing, i) => (
            <li key={i} className="cocktail-info-ingredient-item">
              <Link
                to={`/ingredient/${encodeURIComponent(ing.ingredient)}`}
                className="cocktail-info-ingredient-link"
              >
                {ing.ingredient}
              </Link>
              {ing.measure ? ` – ${ing.measure}` : ''}
            </li>
          ))}
        </ul>
        <h4 className="cocktail-info-instructions-title">Instruktioner</h4>
        <p className="cocktail-info-instructions">{cocktail.instructions}</p>
        <ReviewList reviews={reviews} />
        <ReviewForm onSubmit={handleAddReview} />
      </div>
    </>
  );
};

export default CocktailInfoPage;
