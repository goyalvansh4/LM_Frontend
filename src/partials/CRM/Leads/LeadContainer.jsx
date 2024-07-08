import React from "react";
import AddLead from "./ManageLeads/AddLead/AddLead";
import { Route, Routes } from "react-router-dom";
import LeadHome from "./LeadHome";
import EditLead from "./ManageLeads/EditLead/EditLead";
import ShowDetails from "./ManageLeads/ShowDetails/ShowDetails";

const LeadContainer = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container flex flex-col gap-1 px-6 py-8 mx-auto">
        <Routes>
          <Route path="/" element={<LeadHome />} />
          <Route path="add" element={<AddLead />} />
          <Route path="edit/:id" element={<EditLead />} />
          <Route path="showDetails/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </main>
  );
};

export default LeadContainer;
