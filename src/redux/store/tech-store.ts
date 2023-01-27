import { configureStore } from '@reduxjs/toolkit';
import { techReducer } from '../reducer/tech-reducer';

export const store = configureStore({
  reducer: {
    techs: techReducer,
  },
});
