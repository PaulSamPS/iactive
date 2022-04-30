import { AppDispatch } from '../store';
import { newsReducer } from '../reducers/newsReducer';
import { INewsInterface, IResponseNews } from '../../interfaces/news.interface';
import { IErrorResponse } from '../../interfaces/error.interface';
import { AxiosError, AxiosResponse } from 'axios';
import { oneNewsReducer } from '../reducers/oneNewsReducer';
import { $api } from '../../http/axios';

export const getNews = (sortBy?: string) => async (dispatch: AppDispatch) => {
  dispatch(newsReducer.actions.setNewsLoading());
  await $api
    .get(`/api/news?sort=${sortBy}`)
    .then((res: AxiosResponse<IResponseNews>) => {
      dispatch(newsReducer.actions.setNewsSuccess(res.data.rows));
      dispatch(newsReducer.actions.setCount(res.data.count));
    })
    .catch((e: AxiosError<IErrorResponse>) => {
      dispatch(newsReducer.actions.setNewsError(e.response?.data.message));
    });
};

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

export const createNews = (formdata: FormData) => async (dispatch: AppDispatch) => {
  await $api.post(`/api/news/create`, formdata);
};

export const updateNews = (formdata: FormData, id: number | undefined) => async (dispatch: AppDispatch) => {
  await $api.put(`/api/news/update/${id}`, formdata);
};

export const deleteNews = (newsId: number | undefined, avatar: string, img: string, sortBy: string) => async (dispatch: AppDispatch) => {
  await $api.delete(`/api/news/delete/${newsId}/${avatar}/${img}`);
  await dispatch(getNews(sortBy));
};
