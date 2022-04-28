import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Favourite } from './pages/Favourite/Favourite';
import { Main } from './pages/Main/Main';
import { News } from './pages/News/News';

export const API_URL = 'http://194.87.98.26:5000';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='favourite' element={<Favourite />} />
          <Route path='news/:id' element={<News />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
