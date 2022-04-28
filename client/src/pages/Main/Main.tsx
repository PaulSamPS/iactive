import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';
import styles from './Main.module.scss';
import { Sort } from '../../components/Sort/Sort';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.newsReducer);
  const { sortBy } = useAppSelector((state) => state.sortReducer);

  React.useEffect(() => {
    dispatch(getNews(sortBy));
  }, [sortBy]);

  React.useEffect(() => {
    const timer = setInterval(async () => {
      await dispatch(getNews(sortBy));
    }, 5000);
    return () => clearInterval(timer);
  }, [sortBy]);

  if (!document.cookie) {
    return <h1>Перезагрузите страницу</h1>;
  }

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
