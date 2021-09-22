import React from "react";

import styles from "./Button.module.scss";

export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: {};
};

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
  <button onClick={onClick} disabled={disabled} className={styles.button}>
    {children}
  </button>
);

export default Button;
