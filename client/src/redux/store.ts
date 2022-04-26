import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsReducer from './reducers/newsReducer';
import favouriteReducer from './reducers/favouriteReducer';
import sortReducer from './reducers/sortReducer';

const rootReducer = combineReducers({
  newsReducer,
  favouriteReducer,
  sortReducer,
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
