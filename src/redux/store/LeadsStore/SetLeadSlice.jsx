import { createSlice } from '@reduxjs/toolkit';
//import { LeadData } from './LeadData';



const setLeadSlice = createSlice({
  name: 'setLead',
  initialState: null,
  reducers: {
    setLeadId: (state, action) => action.payload,
    clearLeadId: () => null,
  },
});

export const { setLeadId, clearLeadId } = setLeadSlice.actions;
export default setLeadSlice.reducer;