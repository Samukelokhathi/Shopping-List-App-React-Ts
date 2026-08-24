import type React from "react";
import buttonStyle from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  width?: string;
  onClick?: () => void;
  className?: string
  style?: React.CSSProperties
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  // width = "fit-content",
  onClick,
  className = "",
  style
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyle.button} ${buttonStyle[variant]} ${className || ""}`} style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
