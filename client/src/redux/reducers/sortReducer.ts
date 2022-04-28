import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISort {
  sortBy: string;
}

const initialState: ISort = {
  sortBy: 'down',
};

export const sortReducer = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSort } = sortReducer.actions;

export default sortReducer.reducer;
