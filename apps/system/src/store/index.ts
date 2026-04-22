import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/api/request'

import authReducer from './auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})