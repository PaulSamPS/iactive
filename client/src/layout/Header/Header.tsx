import React from 'react';
import { Button } from '../../components/Button/Button';
import { ReactComponent as FavoriteIcon } from '../../helpers/icons/star.svg';
import { ReactComponent as BurgerIcon } from '../../helpers/icons/burger.svg';
import { useNavigate } from 'react-router-dom';
import { AppendNews } from '../../components/AppendNews/AppendNews';
import styles from './Header.module.scss';
// import { useAppDispatch } from '../../hooks/redux';
// import { getFavouriteNews } from '../../redux/actions/favouriteAction';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { MobileMenu } from '../../components/MobileMenu/MobileMenu';

export const Header = (): JSX.Element => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  const [modalMenu, setModalMenu] = React.useState<boolean>(false);
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' },
  };

  const variantsOverlay = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const resizeWindow = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleClick = () => {
    // dispatch(getFavouriteNews());
    navigate('/');
  };

  const appendNews = () => {
    setModal(true);
  };

  React.useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);

  return (
    <div className={styles.wrapper}>
      {screenWidth >= 768 ? (
        <div className={styles.container}>
          <h1 className={styles.logo} onClick={handleClick}>
            IActive
          </h1>
          <div className={styles.right}>
            <div className={styles.favourite} onClick={() => navigate('/favourite')}>
              <FavoriteIcon />
              <span>Избранное</span>
            </div>
            <Button appearance='primary' onClick={appendNews}>
              Добавить новость
            </Button>
          </div>
          <AppendNews setModal={setModal} modal={modal} />
        </div>
      ) : (
        <div className={styles.mobile}>
          <h1
            className={cn(styles.logo, {
              [styles.logoMobile]: screenWidth <= 768,
            })}
            onClick={handleClick}
          >
            IActive
          </h1>
          <div className={styles.burger} onClick={() => setModalMenu(true)}>
            <BurgerIcon />
          </div>
          <AppendNews setModal={setModal} modal={modal} />
        </div>
      )}
      <AnimatePresence>
        {modalMenu && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={() => setModalMenu(false)}
              animate={modalMenu ? 'open' : 'closed'}
              variants={variantsOverlay}
              exit={'closed'}
              initial={'closed'}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            />
            <motion.div
              className={styles.menu}
              animate={modalMenu ? 'open' : 'closed'}
              variants={variants}
              initial={'closed'}
              exit={'closed'}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <MobileMenu setModalMenu={setModalMenu} setModal={setModal} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
