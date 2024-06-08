import { createSlice } from '@reduxjs/toolkit';

// console.log(UserData);
const fetchUserData = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
}

const initialState = fetchUserData();
export const userSlice = createSlice({
  name: 'AddUser',
  initialState,
  reducers: {
    addUser: (state=initialState, action) => {
      const newUser = { ...action.payload, id: state.length + 1 };
      const updatedState = [newUser, ...state];
      localStorage.setItem("users", JSON.stringify(updatedState));
      return updatedState;
    },
    editUser: (state=initialState, action) => {
      const updatedState = state.map((user) =>
        user.id === action.payload.id ? { ...action.payload } : user
      );
      localStorage.setItem("users", JSON.stringify(updatedState));
      return updatedState;
    },
    deleteUser: (state, action) => {
      const updatedState = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(updatedState));
      return updatedState;
    },
  }
})

export const { addUser,editUser,deleteUser } = userSlice.actions;
export default userSlice.reducer;