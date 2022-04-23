import React from 'react';
import { Card } from './components/Card/Card';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getNews } from './redux/actions/newsAction';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Favourite } from './components/Favourite/Favourite';

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Card />} />
          <Route path='favourite' element={<Favourite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
