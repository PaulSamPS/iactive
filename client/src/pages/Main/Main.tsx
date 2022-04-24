import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getNews } from '../../redux/actions/newsAction';
import { Card } from '../../components/Card/Card';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { news } = useAppSelector((state) => state.newsReducer);

  React.useEffect(() => {
    dispatch(getNews());
    const timer = setInterval(() => {
      dispatch(getNews());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  console.log(news);

  if (news.length <= 0) {
    return <h1>Не добалено ни одной новости...</h1>;
  }

  return (
    <>
      {news.map((n) => (
        <Card key={n.id} news={n} />
      ))}
    </>
  );
};
