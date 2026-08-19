import type React from "react";
import buttonStyle from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  width?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  width = "100%",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyle.button} ${buttonStyle[variant]}`}
      style={{ width }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
