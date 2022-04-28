import React from 'react';
import styles from './BackBtn.module.scss';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { getFavouriteNews } from '../../redux/actions/favouriteAction';

export const BackBtn = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(getFavouriteNews());
    navigate('/');
  };

  return (
    <div className={styles.back} onClick={handleClick}>
      <ArrowIcon /> На главную
    </div>
  );
};
