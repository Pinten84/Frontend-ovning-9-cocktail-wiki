
import React from "react";
import "./CenteredCardLayout.css";

interface Props {
  title: string;
  children: React.ReactNode;
}

const CenteredCardLayout: React.FC<Props> = ({ title, children }) => {
  // Hide horizontal overflow on body
  React.useEffect(() => {
    const original = document.body.style.overflowX;
    document.body.style.overflowX = "hidden";
    return () => { document.body.style.overflowX = original; };
  }, []);
  return (
    <div className="centered-card-layout">
  {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
        alt=""
        className="centered-card-bg"
        aria-hidden="true"
        role="presentation"
      />
      <div className="centered-card-content">
        <h1 className="centered-card-title">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default CenteredCardLayout;
