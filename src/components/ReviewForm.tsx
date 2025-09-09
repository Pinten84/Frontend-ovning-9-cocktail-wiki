import { sanitizeInput } from '../sanitizeInput';
import React, { useState } from 'react';
import './ReviewForm.css';

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; text: string }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValid, setCaptchaValid] = useState(true);
  // Simple random math captcha
  const [captchaA] = useState(() => Math.floor(Math.random() * 8) + 2); // 2-9
  const [captchaB] = useState(() => Math.floor(Math.random() * 8) + 2); // 2-9
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
      text: sanitizeInput(text, 240),
    });
    setName('');
    setRating(5);
    setText('');
    setCaptcha('');
  }

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4 className="review-form-title">Lämna en recension</h4>
      <label htmlFor="review-name" className="sr-only">
        Ditt namn
      </label>
      <input
        id="review-name"
        type="text"
        placeholder="Ditt namn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="review-form-input"
        aria-label="Ditt namn"
      />
      <div className="review-form-rating-row">
        <label htmlFor="review-rating">Betyg:</label>
        <select
          id="review-rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="review-form-select"
          aria-label="Betyg"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} {'⭐'.repeat(n)}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="review-text" className="review-form-label">
        Din recension
      </label>
      <textarea
        id="review-text"
        placeholder="Din recension..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows={4}
        className="review-form-textarea"
        aria-label="Din recension"
      />
      <div className="review-form-captcha-row">
        <label htmlFor="review-captcha">
          <span style={{ whiteSpace: 'nowrap' }}>{`Vad är ${captchaA} + ${captchaB}?`}</span>
        </label>
        <input
          id="review-captcha"
          type="text"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          required
          className="review-form-captcha-input"
          aria-label="Captcha: svara på frågan"
        />
        {!captchaValid && <span className="review-form-captcha-error">Fel svar</span>}
      </div>
      <button type="submit" className="custom-btn review-form-submit" aria-label="Skicka recension">
        Skicka
      </button>
    </form>
  );
};

export default ReviewForm;
