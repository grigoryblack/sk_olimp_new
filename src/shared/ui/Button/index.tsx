import React from 'react';
import styles from './Button.module.scss';

type ButtonSize = 'S' | 'M' | 'L';
type ButtonVariant = 'primary' | 'outlined' | 'ghost';

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = 'M',
  variant = 'primary',
  disabled = false,
  onClick,
  id,
  children,
  className,
}) => {
  const buttonClasses = [
    styles.button,
    styles[`size-${size}`],
    styles[`variant-${variant}`],
    disabled ? styles.disabled : '',
    className
  ].join(' ');

  return (
    <button id={id} className={buttonClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
