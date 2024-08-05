import React from "react";
import AddLead from "./ManageCategories/AddLead/AddLead";
import { Route, Routes } from "react-router-dom";
import CategoryHome from "./CategoryHome";
import EditLead from "./ManageCategories/EditLead/EditLead";
import ShowDetails from "./ManageCategories/ShowDetails/ShowDetails";
import AddBulkLeads from "./ManageCategories/AddBulkLeads/AddBulkLeads";

const LeadContainer = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container flex px-2 flex-col gap-1 lg:px-6 py-8 mx-auto">
        <Routes>
          <Route path="/" element={<CategoryHome />} />
          <Route path="import" element={<AddBulkLeads />} />
          <Route path="add" element={<AddLead />} />
          <Route path="edit/:id" element={<EditLead />} />
          <Route path="showDetails/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </main>
  );
};

export default LeadContainer;
