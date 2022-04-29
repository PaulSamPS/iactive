import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import styles from './Favourite.module.scss';

export const Favourite = (): JSX.Element => {
  const { favouriteNews, isLoading } = useAppSelector((state) => state.favouriteReducer);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getFavouriteNews());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if ((favouriteNews && favouriteNews.length <= 0) || !favouriteNews) {
    return (
      <div className={styles.wrapper}>
        <BackBtn />
        <h2 className={styles.notFound}>Вы пока ничего не добавили в избранное</h2>;
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <BackBtn />
      {favouriteNews && favouriteNews.map((f) => <Card key={f.id} news={f} />)}
    </div>
  );
};
