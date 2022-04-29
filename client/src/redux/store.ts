import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducers/newsReducer';
import favouriteReducer from './reducers/favouriteReducer';
import oneNewsReducer from './reducers/oneNewsReducer';
import appendFavouriteReducer from './reducers/appendFavouriteReducer';

const rootReducer = combineReducers({
  newsReducer,
  favouriteReducer,
  oneNewsReducer,
  appendFavouriteReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
