import type React from "react";
import inputStyle from "./Input.module.css";

type InputProps = {
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  label?: string;
  error?: string;
  name?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string
  required?: boolean
};

export const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
  type = "text",
  // className = "",
  required
}) => {
  return (
    <div className={inputStyle["input-label-container"]}>
      <label className={inputStyle["input-label"]}>{label}</label>
      <input
        name={name}
        id={id}
        style={style}
        type={type}
        value={value}
        onChange={onChange}
        className={inputStyle.input}
        required={required}
      />
      {error && <span className={inputStyle["input-error"]}>{error}</span>}
    </div>
  );
};
