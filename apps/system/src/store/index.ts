import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/api/request'

import authReducer from './auth'
import tabsReducer from './tabs'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})