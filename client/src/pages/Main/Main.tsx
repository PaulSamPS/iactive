import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';
import { Sort } from '../../components/Sort/Sort';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';
import styles from './Main.module.scss';
import { createPages } from '../../helpers/pageCreator';
import { Button } from '../../components/Button/Button';
import { setCurrentPage } from '../../redux/reducers/newsReducer';
import cn from 'classnames';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { news, sortBy, totalCount, perPage, currentPage } = useAppSelector((state) => state.newsReducer);
  const totalPage = Math.ceil(totalCount / perPage);
  const pages: number[] = [];

  createPages(pages, totalPage, currentPage);

  React.useEffect(() => {
    dispatch(getNews(sortBy));
    dispatch(getFavouriteNews());
  }, [sortBy, currentPage]);

  React.useEffect(() => {
    const timer = setInterval(async () => {
      await dispatch(getNews(sortBy));
    }, 5000);
    return () => clearInterval(timer);
  }, [sortBy, currentPage]);

  if (news.length <= 0) {
    return <h2 className={styles.notFound}>Нет новостей...</h2>;
  }

  return (
    <>
      <Sort />
      {news.map((n) => (
        <Card layout key={n.id} news={n} />
      ))}
      <div className={styles.pagination}>
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
    </>
  );
};
