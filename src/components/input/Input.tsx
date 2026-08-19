import type React from "react";
import inputStyle from "./Input.module.css";

type InputProps = {
  id?: string;
  value?: string;
  style?: React.CSSProperties;
  label: string;
  error?: string;
  name?: string;
  type?: string;
};

export const Input: React.FC<InputProps> = ({
  id,
  value,
  style,
  label,
  error,
  name,
  type,
}) => {
  return (
    <div className={inputStyle["input-label-container"]}>
      <label className={inputStyle["input-label"]}>{label}</label>
      <input
        name={name}
        type={type || "text"}
        id={id}
        style={style}
        value={value}
        className={inputStyle.input}
      />
      {error && <span className={inputStyle["input-error"]}>{error}</span>}
    </div>
  );
};
