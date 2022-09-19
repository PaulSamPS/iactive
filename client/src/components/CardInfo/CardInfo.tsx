import React from 'react';
import { CardInfoProps } from './CardInfo.props';
import { BackBtn } from '../Ui/BackBtn/BackBtn';
import { API_URL } from '../../http/axios';
import moment from 'moment';
import styles from './CardInfo.module.scss';

export const CardInfo = ({ news }: CardInfoProps): JSX.Element => {
  const date = moment(news.createdAt).format('D.MM.y');
  return (
    <div className={styles.wrapper}>
      <BackBtn />
      <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <div className={styles.top}>
          <img src={`${API_URL}/avatar/${news.avatar}`} alt={news.author} />
          <span>{news.author}</span>
        </div>
        <h2>{news.title}</h2>
        <div className={styles.img}>
          <img src={`${API_URL}/news/${news.img}`} alt={news.author} />
        </div>
        <p className={styles.body}>{news.body}</p>
      </div>
    </div>
  );
};
