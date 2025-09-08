import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavButton.css";

interface Props {
  to: string;
  children: React.ReactNode;
}

const NavButton: React.FC<Props> = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`nav-btn${active ? " nav-btn-active" : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavButton;
