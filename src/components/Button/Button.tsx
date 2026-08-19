import type React from "react";
import buttonStyle from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  width = "100%",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${buttonStyle.button} ${buttonStyle[variant]}`}
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
