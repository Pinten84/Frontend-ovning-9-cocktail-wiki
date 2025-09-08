import React from "react";
import "./Button.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<Props> = ({ danger, className = "", icon, children, ...props }) => {
  const btnClass = [
    "custom-btn",
    danger ? "custom-btn-danger" : "",
    props.disabled ? "custom-btn-disabled" : "",
    className
  ].filter(Boolean).join(" ");
  return (
    <button className={btnClass} {...props}>
      {icon && <span className="custom-btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
