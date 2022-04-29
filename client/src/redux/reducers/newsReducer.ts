import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewsInterface } from '../../interfaces/news.interface';

interface INews {
  news: INewsInterface[];
  isLoading: boolean;
  error: string | undefined;
  sortBy: string;
  count: number;
}

const initialState: INews = {
  news: [],
  isLoading: false,
  error: '',
  sortBy: 'down',
  count: 0,
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
      state.news = action.payload;
    },
    setNewsError(state, action: PayloadAction<string | undefined>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setSort } = newsReducer.actions;

export default newsReducer.reducer;
