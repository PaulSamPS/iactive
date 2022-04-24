import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.newsReducer);

  console.log(news);

  React.useEffect(() => {
    dispatch(getNews());
    const timer = setInterval(() => {
      dispatch(getNews());
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {news.map((n) => (
        <Card key={n.id} news={n} />
      ))}
    </>
  );
};
