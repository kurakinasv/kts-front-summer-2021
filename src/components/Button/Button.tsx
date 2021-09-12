import React from "react";

import "./Button.scss";

export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: {};
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
