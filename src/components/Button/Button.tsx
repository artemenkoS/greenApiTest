import clsx from 'clsx';

import styles from './Button.module.css';

interface IProps {
  onClick: (e: any) => void;
  className?: string;
  text: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = ({ text, onClick, className, disabled = false, fullWidth = false }: IProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={clsx(styles.root, fullWidth && styles.fullWidth, className)}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
