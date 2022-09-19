import React, { ChangeEvent } from 'react';
import { Input } from '../Ui/Input/Input';
import { Button } from '../Ui/Button/Button';
import { Modal } from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import { IFormdataInterface } from '../../interfaces/formdata.interface';
import { AppendNewsProps } from './AppendNews.props';
import { Textarea } from '../Ui/Textarea/Textarea';
import {
  IAppendNewsAvatarInterface,
  IAppendNewsInterface,
} from '../../interfaces/AppendNews.interface';
import { createNews, updateNews } from '../../redux/actions/newsAction';
import cn from 'classnames';
import styles from './AppendNews.module.scss';

export const AppendNews = ({
  modal,
  setModal,
  update,
  newsId,
  avatar,
  img,
  setUpdate,
}: AppendNewsProps): JSX.Element => {
  const [filesAvatar, setFilesAvatar] = React.useState<FileList | null>(null);
  const [filesNews, setFilesNews] = React.useState<FileList | null>(null);
  const [previewAvatar, setPreviewAvatar] = React.useState<IAppendNewsAvatarInterface[]>([]);
  const [previewNews, setPreviewNews] = React.useState<IAppendNewsInterface[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IFormdataInterface>({ mode: 'onChange' });

  const onSubmit = async (data: IFormdataInterface) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('body', data.body);

    if (filesAvatar) {
      if (update) {
        formData.append('avatarOld', avatar as unknown as Blob);
      }

      formData.append('avatar', filesAvatar[0]);
    } else {
      formData.append('avatar', '');
    }

    if (filesNews) {
      if (update) {
        formData.append('imgOld', img as unknown as Blob);
      }

      formData.append('img', filesNews[0]);
    } else {
      formData.append('img', '');
    }

    if (update) {
      await updateNews(formData, newsId);
      if (setUpdate) {
        setUpdate(false);
      }
    } else {
      await createNews(formData);
    }
    setModal(false);
    reset();
    setPreviewAvatar([]);
    setPreviewNews([]);
  };

  const selectFileAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = [] as any[];
    avatar.push({ avatar: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewAvatar(avatar);
    setFilesAvatar(e.target.files);
  };

  const selectFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images = [] as any[];
    images.push({ img: URL.createObjectURL(e.target.files![0]), number: Date.now() });
    setPreviewNews(images);
    setFilesNews(e.target.files);
  };

  return (
    <Modal modal={modal} setModal={setModal}>
      <h2 className={styles.title}>{update ? 'Обновить' : 'Добавить'} новость</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.append}>
        {previewAvatar.length > 0 && (
          <label htmlFor='previewAvatar'>
            Предпросмотр:
            <div className={styles.previewBlock} id='previewAvatar'>
              {previewAvatar.map(
                (f: IAppendNewsAvatarInterface, index: number): JSX.Element => (
                  <div className={styles.previewAvatar} key={f.number}>
                    <img src={f.avatar} alt={'image' + index} />
                  </div>
                )
              )}
            </div>
          </label>
        )}
        <div className={styles.inputFile}>
          <label htmlFor='avatar'>
            Аватар:
            <Input
              {...register('avatar', { required: { value: !update, message: 'Выберите аватар' } })}
              placeholder='Выберите аватар'
              type='file'
              id='file'
              error={errors.avatar}
              onChange={selectFileAvatar}
              className={styles.file}
            />
            <label htmlFor='file'>
              <span
                className={cn(styles.inputBtn, {
                  [styles.fileSuccess]: previewAvatar.length > 0,
                })}
              >
                {previewAvatar.length <= 0 ? 'Выберите аватар' : 'Аватар выбран'}
              </span>
            </label>
          </label>
        </div>
        <label htmlFor='author'>
          Автор новости:
          <Input
            {...register('author', {
              required: { value: !update, message: 'Введите автора новости' },
            })}
            placeholder='Укажите автора новости'
            type='text'
            error={errors.author}
          />
        </label>
        <label htmlFor='title'>
          Название:
          <Input
            {...register('title', {
              required: { value: !update, message: 'Введите название новости' },
            })}
            placeholder='Введите название новости'
            type='text'
            error={errors.title}
          />
        </label>
        {previewNews.length > 0 && (
          <label htmlFor='previewNews' className={styles.labelTextarea}>
            Предпросмотр:
            <div className={styles.previewBlock} id='previewNews'>
              {previewNews.map(
                (f: IAppendNewsInterface, index: number): JSX.Element => (
                  <div className={styles.previewImage} key={f.number}>
                    <img src={f.img} alt={'image' + index} />
                  </div>
                )
              )}
            </div>
          </label>
        )}
        <div className={styles.inputFile}>
          <label htmlFor='img'>
            Изображение:
            <Input
              {...register('img', {
                required: { value: !update, message: 'Выберите изображение' },
              })}
              placeholder='Выберите изображение'
              type='file'
              id='img'
              error={errors.img}
              onChange={selectFileImage}
              className={styles.file}
            />
            <label htmlFor='img'>
              <span
                className={cn(styles.inputBtn, {
                  [styles.fileSuccess]: previewNews.length > 0,
                })}
              >
                {previewNews.length <= 0 ? 'Выберите изображение' : 'Изображение выбрано'}
              </span>
            </label>
          </label>
        </div>
        <label htmlFor='body' className={styles.labelTextarea}>
          Текст новости:
          <Textarea
            {...register('body', {
              required: { value: !update, message: 'Введите текст новости' },
            })}
            className={styles.body}
            placeholder='Текст новости'
            error={errors.body}
          />
        </label>
        <Button appearance='primary' disabled={!isValid} className={styles.btn}>
          Добавить
        </Button>
      </form>
    </Modal>
  );
};
