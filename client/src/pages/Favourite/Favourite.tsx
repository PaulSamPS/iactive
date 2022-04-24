import React from 'react';
import styles from './Favourite.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';

export const Favourite = () => {
  const dispatch = useAppDispatch();
  const { favouriteNews } = useAppSelector((state) => state.favouriteReducer);

  console.log(favouriteNews);

  React.useEffect(() => {
    dispatch(getFavouriteNews());
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Favourite</h1>
    </div>
  );
};
