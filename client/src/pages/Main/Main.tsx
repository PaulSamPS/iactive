import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';
import { Sort } from '../../components/Sort/Sort';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';
import styles from './Main.module.scss';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { news, sortBy } = useAppSelector((state) => state.newsReducer);

  React.useEffect(() => {
    dispatch(getNews(sortBy));
    dispatch(getFavouriteNews());
  }, [sortBy, dispatch]);

  React.useEffect(() => {
    const timer = setInterval(async () => {
      await dispatch(getNews(sortBy));
    }, 5000);
    return () => clearInterval(timer);
  }, [sortBy]);

  if (news.length <= 0) {
    return <h2 className={styles.notFound}>Нет новостей...</h2>;
  }

  return (
    <>
      <Sort />
      {news.map((n) => (
        <Card layout key={n.id} news={n} />
      ))}
    </>
  );
};
