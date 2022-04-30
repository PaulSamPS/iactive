import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewsInterface } from '../../interfaces/news.interface';

interface INews {
  news: INewsInterface[];
  isLoading: boolean;
  error: string | undefined;
  sortBy: string;
  totalCount: number;
  currentPage: number;
  perPage: number;
}

const initialState: INews = {
  news: [],
  isLoading: false,
  error: '',
  sortBy: 'up',
  totalCount: 0,
  currentPage: 1,
  perPage: 20,
};

export const newsReducer = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsLoading(state) {
      state.isLoading = true;
    },
    setNewsSuccess(state, action: PayloadAction<INewsInterface[]>) {
      state.isLoading = false;
      state.error = '';
      state.news = action.payload.slice(state.perPage * state.currentPage - state.perPage, state.perPage * state.currentPage);
    },
    setNewsError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setSort, setCurrentPage } = newsReducer.actions;

export default newsReducer.reducer;
