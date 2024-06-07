import { createSlice } from '@reduxjs/toolkit';
import { LeadData } from './LeadData';


// console.log(LeadData);
const initialState = LeadData;
export const LeadSlice = createSlice({
  name: 'Lead',
  initialState,
  reducers: {
    addLead: (state=initialState, action) => {
      console.log(action.payload);
      let id = state.length + 1;
      action.payload.id = id;
      // state = action.payload
      return [action.payload,...state];
    },
    editLead: (state=initialState, action) => {
      //console.log(initialState);
      const editedData = initialState.map((lead) => lead.id !== action.payload.id ? {...lead} :{ ...action.payload });
      console.log(editedData);
      //const {id,name,email,title,department,role,status} = action.payload;
      return editedData;
    },
    deleteLead: (state=initialState, action) => {
      return state.filter((lead) => lead.id !== action.payload);
    }
  }
})

export const { addLead,editLead,setLeadId,setData,deleteLead } = LeadSlice.actions;
export default LeadSlice.reducer;