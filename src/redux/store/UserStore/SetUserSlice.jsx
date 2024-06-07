import { createSlice } from '@reduxjs/toolkit';
import  {userData } from './UserData';

const initialState = userData;
const setUserSlice = createSlice({
  name: 'setUser',
  initialState: null,
  reducers: {
    setUserId: (state, action) => action.payload,
    clearUserId: () => null,
  },
});

export const { setUserId, clearUserId } = setUserSlice.actions;
export default setUserSlice.reducer;