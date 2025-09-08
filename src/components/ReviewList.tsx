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
    <div className="review-list">
      <h4 className="review-list-title">Recensioner</h4>
      {reviews.map((r, i) => (
        <div key={i} className="review-list-item">
          <div className="review-list-name">{sanitizeInput(r.name, 32)} <span className="review-list-stars">{" ".repeat(2)}{Array.from({length: r.rating}, () => "⭐").join("")}</span></div>
          <div className="review-list-text">{sanitizeInput(r.text, 240)}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
