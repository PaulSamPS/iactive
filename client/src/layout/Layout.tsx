import React from 'react';
import styles from './Layout.module.scss';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

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
