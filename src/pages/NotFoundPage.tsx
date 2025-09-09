
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';


const NotFoundPage: React.FC = () => (
  <div className="notfound-container">
    <h1 className="notfound-title">404</h1>
    <h2 className="notfound-subtitle">Sidan finns inte</h2>
    <p className="notfound-message">
      Tyvärr, vi kunde inte hitta sidan du letade efter.
      <br />
      Kanske har du skrivit fel adress, eller så har sidan flyttats.
    </p>
    <Link to="/" className="notfound-link">
      Till startsidan
    </Link>
  </div>
);

export default NotFoundPage;
