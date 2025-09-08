import { sanitizeInput } from "../sanitizeInput";
import React, { useState } from "react";
import "./ReviewForm.css";

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; text: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaValid, setCaptchaValid] = useState(true);
  // Simple random math captcha
  const [captchaA] = useState(() => Math.floor(Math.random() * 8) + 2); // 2-9
  const [captchaB] = useState(() => Math.floor(Math.random() * 8) + 2); // 2-9
  const captchaQuestion = `Vad är ${captchaA} + ${captchaB}?`;
  const captchaAnswer = String(captchaA + captchaB);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (captcha.trim() !== captchaAnswer) {
      setCaptchaValid(false);
      return;
    }
    setCaptchaValid(true);
    onSubmit({
      name: sanitizeInput(name, 32),
      rating,
      text: sanitizeInput(text, 240)
    });
    setName("");
    setRating(5);
    setText("");
    setCaptcha("");
  }

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4 className="review-form-title">Lämna en recension</h4>
      <input
        type="text"
        placeholder="Ditt namn"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="review-form-input"
      />
      <div className="review-form-rating-row">
        Betyg:
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="review-form-select">
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
        </select>
      </div>
      <textarea
        placeholder="Din recension"
        value={text}
        onChange={e => setText(e.target.value)}
        required
        rows={3}
        className="review-form-textarea"
      />
      <div className="review-form-captcha-row">
        <label>
          {captchaQuestion}
          <input
            type="text"
            value={captcha}
            onChange={e => setCaptcha(e.target.value)}
            required
            className="review-form-captcha-input"
          />
        </label>
        {!captchaValid && <span className="review-form-captcha-error">Fel svar</span>}
      </div>
      <button type="submit" className="review-form-submit">Skicka</button>
    </form>
  );
};

export default ReviewForm;
