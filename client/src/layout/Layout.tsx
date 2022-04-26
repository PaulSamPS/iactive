import React from 'react';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

export const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
