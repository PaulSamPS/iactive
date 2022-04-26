import React from 'react';
import { setSort } from '../../redux/reducers/sortReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrow.svg';
import cn from 'classnames';
import styles from './Sort.module.scss';

export const Sort = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.sortReducer);

  return (
    <div className={styles.wrapper}>
      <span onClick={() => dispatch(setSort('up'))} className={cn(styles.sort, { [styles.active]: sortBy === 'up' })}>
        По дате <ArrowIcon className={styles.up} />
      </span>
      <span onClick={() => dispatch(setSort('down'))} className={cn(styles.sort, { [styles.active]: sortBy === 'down' })}>
        По дате <ArrowIcon className={styles.down} />
      </span>
    </div>
  );
};
