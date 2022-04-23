import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({ appearance, children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.transparent]: appearance == 'transparent',
        [styles.card]: appearance == 'card',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
