import React from 'react';
import styles from './Card.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { ReactComponent as StarIcon } from '../../helpers/icons/star.svg';
import { ReactComponent as SettingsIcon } from '../../helpers/icons/settings.svg';
import { ReactComponent as RectangleIcon } from '../../helpers/icons/rectangle.svg';
import cn from 'classnames';
import { Button } from '../Button/Button';

export const Card = () => {
  const { news } = useAppSelector((state) => state.newsReducer);
  const [like, setLike] = React.useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      {news.map((n) => (
        <div key={n.id} className={styles.author}>
          <img className={styles.avatar} src={`http://localhost:5000/avatar/${n.avatar}`} alt='aif' />
          <div className={styles.name}>
            <div>{n.author}</div>
            <div className={styles.comment}>Текст поста в соц. сетях если это комментарий</div>
          </div>
          <div className={styles.position}>
            <Button appearance='card'>Левый</Button>
            <Button appearance='card'>Центр</Button>
            <Button appearance='card'>Правый</Button>
          </div>
          <div>
            <SettingsIcon />
            <RectangleIcon />
            <StarIcon
              className={cn(styles.favourite, {
                [styles.append]: like,
              })}
              onClick={() => setLike(!like)}
            />
          </div>
          <p>{n.body}</p>
          <img className={styles.image} src={`http://localhost:5000/news/${n.img}`} alt='aif' />
        </div>
      ))}
    </div>
  );
};
