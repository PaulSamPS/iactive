import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';
import styles from './Main.module.scss';
import { Sort } from '../../layout/Sort/Sort';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.newsReducer);
  const { sortBy } = useAppSelector((state) => state.sortReducer);

  React.useEffect(() => {
    dispatch(getNews(sortBy));
  }, [sortBy]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch(getNews(sortBy));
    }, 5000);
    return () => clearInterval(timer);
  }, [sortBy]);

  if (news.length <= 0) {
    return <h2 className={styles.notFound}>Не добалено ни одной новости...</h2>;
  }

  return (
    <>
      <Sort />
      {news.map((n) => (
        <Card key={n.id} news={n} />
      ))}
    </>
  );
};
