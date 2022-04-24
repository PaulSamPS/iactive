import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Favourite } from './components/Favourite/Favourite';
import { Main } from './pages/Main/Main';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='favourite' element={<Favourite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
