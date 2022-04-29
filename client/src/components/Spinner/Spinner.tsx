import React from 'react';
import { SpinnerProps } from './Spinner.props';
import cn from 'classnames';
import styles from './Spinner.module.scss';

export const Spinner = ({ className, ...props }: SpinnerProps): JSX.Element => {
  return <div className={cn(className, styles.spinner)} {...props} />;
};
