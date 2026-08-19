import type React from "react";
import inputStyle from "./Input.module.css";

type InputProps = {
  id?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
  label: string;
  error?: string;
  name?: string;
};

export const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  style,
  label,
  error,
  name,
}) => {
  return (
    <div className={inputStyle["input-label-container"]}>
      <label className={inputStyle["input-label"]}>{label}</label>
      <input
        name={name}
        type="text"
        id={id}
        style={style}
        value={value}
        onChange={onChange}
        className={inputStyle.input}
      />
      {error && <span className={inputStyle["input-error"]}>{error}</span>}
    </div>
  );
};
