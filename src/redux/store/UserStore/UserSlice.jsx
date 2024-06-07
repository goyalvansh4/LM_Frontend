import { createSlice } from '@reduxjs/toolkit';
import { userData } from './UserData';


// console.log(LeadData);
const initialState = userData;
export const userSlice = createSlice({
  name: 'AddUser',
  initialState,
  reducers: {
    addUser: (state=initialState, action) => {
      //console.log(action.payload);
      let id = state.length + 1;
      action.payload.id = id;
      // state = action.payload
      return [action.payload,...state];
    },
    editUser: (state=initialState, action) => {
      //console.log(initialState);
      const editedData = initialState.map((user) => user.id !== action.payload.id ? {...user} :{ ...action.payload });
      //console.log(editedData);
      //const {id,name,email,title,department,role,status} = action.payload;
      return editedData;
    },
    deleteUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload);
    },
  }
})

export const { addUser,editUser,deleteUser } = userSlice.actions;
export default userSlice.reducer;