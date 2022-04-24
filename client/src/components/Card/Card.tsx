import React from 'react';
import { CardProps } from './Card.props';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../helpers/icons/arrow.svg';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as RectangleIcon } from '../../helpers/icons/rectangle.svg';
import { ReactComponent as StarIcon } from '../../helpers/icons/star.svg';
import cn from 'classnames';
import moment from 'moment';
import styles from './Card.module.scss';

export const Card = ({ news, ...props }: CardProps): JSX.Element => {
  const [like, setLike] = React.useState<boolean>(false);
  const time = moment(news.createdAt).format('H:mm');

  return (
    <div className={styles.wrapper} {...props}>
      <img className={styles.avatar} src={`http://localhost:5000/avatar/${news.avatar}`} alt='aif' />
      <div className={styles.title}>{news.author}</div>
      <div className={styles.position}>
        <Button appearance='card'>Левый</Button>
        <Button appearance='card'>Центр</Button>
        <Button appearance='card'>Правый</Button>
      </div>
      <div className={styles.icons}>
        <ArrowIcon />
        <SettingsIcon />
        <RectangleIcon />
        <StarIcon
          className={cn(styles.favourite, {
            [styles.append]: like,
          })}
          onClick={() => setLike(!like)}
        />
      </div>
      <span className={styles.time}>{time}</span>
      <p className={styles.body}>{news.body}</p>
      <img className={styles.image} src={`http://localhost:5000/news/${news.img}`} alt='aif' />
    </div>
  );
};
