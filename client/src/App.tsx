import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Favourite } from './pages/Favourite/Favourite';
import { Main } from './pages/Main/Main';
import { News } from './pages/News/News';
import { socketContext, SocketContext } from './context/socketContext';

export const App = () => {
  const { socket } = socketContext();
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='favourite' element={<Favourite />} />
            <Route path='news/:id' element={<News />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
