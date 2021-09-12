import styles from "@styles/style.module.scss";

export type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  className: string;
  isDisabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  className,
  isDisabled,
}) => (
  <input
    value={value}
    className={styles.search__input}
    placeholder={placeholder}
    onChange={onChange}
    disabled={isDisabled}
  />
);

export default Input;
