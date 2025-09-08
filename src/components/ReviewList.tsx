import React from "react";
import { sanitizeInput } from "../sanitizeInput";
import "./ReviewList.css";

interface Review {
  name: string;
  rating: number;
  text: string;
}

interface ReviewListProps {
  reviews: Review[];
}



const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) return <p className="review-list-empty">Inga recensioner än.</p>;
  return (
    <div className="review-list" aria-label="Recensioner">
      <h4 className="review-list-title">Recensioner</h4>
      {reviews.map((r, i) => (
        <div key={i} className="review-list-item" aria-label={`Recension av ${sanitizeInput(r.name, 32)}`} tabIndex={0}>
          <div className="review-list-name">
            {sanitizeInput(r.name, 32)}
            <span className="review-list-dash">&nbsp;&ndash;&nbsp;</span>
            <span className="review-list-stars">
              {[...Array(r.rating)].map((_, idx) => <span key={idx} className="star" role="img" aria-label="stjärna">⭐</span>)}
            </span>
          </div>
          <div className="review-list-text"><em>{sanitizeInput(r.text, 240)}</em></div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
