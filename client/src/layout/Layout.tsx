import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import styles from './Layout.module.scss';

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
