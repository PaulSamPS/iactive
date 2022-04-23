import React from 'react';
import './App.module.scss';
import { Card } from './components/Card/Card';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getNews } from './redux/actions/newsAction';

export const App = () => {
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
  return <Card />;
};
