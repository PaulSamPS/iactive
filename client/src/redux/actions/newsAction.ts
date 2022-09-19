import { AppDispatch } from '../store';
import { INewsInterface } from '../../interfaces/news.interface';
import { IErrorResponse } from '../../interfaces/error.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { oneNewsReducer } from '../reducers/oneNewsReducer';
import { $api } from '../../http/axios';

export const getOneNews = (id: string | undefined) => async (dispatch: AppDispatch) => {
  dispatch(oneNewsReducer.actions.setOneNewsLoading());
  await $api
    .get(`/api/news/${id}`)
    .then((res: AxiosResponse<INewsInterface>) => {
      dispatch(oneNewsReducer.actions.setOneNewsSuccess(res.data));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(oneNewsReducer.actions.setOneNewsError(e.response?.data.message));
    });
};

export const createNews = async (formData: FormData) => {
  await $api.post(`/api/news/create`, formData);
};

export const updateNews = async (formData: FormData, id: string | undefined) => {
  await $api.put(`/api/news/update/${id}`, formData);
};

export const deleteNews = async (newsId: string | undefined, avatar: string, img: string) => {
  await $api.delete(`/api/news/delete/${newsId}/${avatar}/${img}`);
};
