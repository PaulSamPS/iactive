import React from 'react';
import {InputProps} from './Input.props';
import {ForwardedRef, forwardRef} from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';


export const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
  return (
    <div className={ cn(className, styles.wrapper)}>
      <input ref={ref} className={cn(styles.input, {
        [styles.error]: error
      })} {...props} />
      {error && <span className={styles.errorMessage}>{ error.message }</span>}
    </div>
  );
});

Input.displayName = 'Input';
