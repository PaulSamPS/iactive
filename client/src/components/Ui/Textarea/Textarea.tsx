import { TextareaProps } from './Textarea.props';
import { ForwardedRef, forwardRef } from 'react';
import styles from './Textarea.module.scss';
import cn from 'classnames';

export const Textarea = forwardRef(({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
  return (
    <div className={cn(className, styles.textAreaWrapper)}>
      <textarea
        ref={ref}
        className={cn(styles.textArea, {
          [styles.error]: error,
        })}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
