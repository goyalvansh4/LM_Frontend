import { createSlice } from '@reduxjs/toolkit';

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