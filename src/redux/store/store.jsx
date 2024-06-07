import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserStore/UserSlice';
import leadReducer from './LeadsStore/LeadSlice';
import setLeadId from './LeadsStore/SetLeadSlice';
import  setUserId  from './UserStore/SetUserSlice';

const store = configureStore({
  reducer:{
   userStore: userReducer,
   leadStore: leadReducer,
   setLeadId:setLeadId,
   setUserId: setUserId,
  },
});

export default store;