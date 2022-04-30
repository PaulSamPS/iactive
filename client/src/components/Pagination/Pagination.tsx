import React from 'react';
import { Button } from '../Button/Button';
import { setCurrentPage } from '../../redux/reducers/newsReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createPages } from '../../helpers/pageCreator';
import cn from 'classnames';
import styles from './Pagination.module.scss';

export const Pagination = () => {
  const { totalCount, perPage, currentPage } = useAppSelector((state) => state.newsReducer);
  const dispatch = useAppDispatch();
  const totalPage = Math.ceil(totalCount / perPage);
  const pages: number[] = [];

  createPages(pages, totalPage, currentPage);
  return (
    <div className={styles.wrapper}>
      {pages.map((p: number) => (
        <Button
          key={p}
          appearance='transparent'
          onClick={() => dispatch(setCurrentPage(p))}
          className={cn(styles.paginateBtn, {
            [styles.active]: currentPage == p,
          })}
        >
          {p}
        </Button>
      ))}
    </div>
  );
};
