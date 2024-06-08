import { createSlice } from "@reduxjs/toolkit";

// Helper function to fetch leads from localStorage
const fetchLeadsFromLocalStorage = () => {
  const leads = localStorage.getItem("leads");
  return leads && JSON.parse(leads);
};

const initialState = fetchLeadsFromLocalStorage();

export const LeadSlice = createSlice({
  name: "Lead",
  initialState,
  reducers: {
    addLead: (state, action) => {
      const newLead = { ...action.payload, id: state.length + 1 };
      const updatedState = [newLead, ...state];
      localStorage.setItem("leads", JSON.stringify(updatedState));
      return updatedState;
    },
    editLead: (state, action) => {
      const updatedState = state.map((lead) =>
        lead.id === action.payload.id ? { ...action.payload } : lead
      );
      localStorage.setItem("leads", JSON.stringify(updatedState));
      return updatedState;
    },
    deleteLead: (state, action) => {
      const updatedState = state.filter((lead) => lead.id !== action.payload);
      localStorage.setItem("leads", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addLead, editLead, deleteLead } = LeadSlice.actions;
export default LeadSlice.reducer;
