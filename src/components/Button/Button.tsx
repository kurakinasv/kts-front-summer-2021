import React from "react";

import SearchIcon from "@components/SearchIcon";
import "./Button.css";

export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ onClick, isDisabled }) => (
  <button onClick={onClick} disabled={isDisabled}>
    <SearchIcon />
  </button>
);

export default Button;
