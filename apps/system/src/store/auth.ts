import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { setUserInfo } = counterSlice.actions

export default counterSlice.reducer