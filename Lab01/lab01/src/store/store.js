import { configureStore } from '@reduxjs/toolkit';
import orchidsReducer from './orchidsSlice';
import categoriesReducer from './categoriesSlice';
import authReducer from './authSlice';

export const store = configureStore({ reducer: { orchids: orchidsReducer, categories: categoriesReducer, auth: authReducer } });
