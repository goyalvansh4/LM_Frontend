import React from "react";
import { Route, Routes } from "react-router-dom";
import LeadHome from "./UserLeadHome";
import UserShowDetails from "./UserShowDetails/UserShowDetails";

const UserLeadContainer = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container flex flex-col gap-1 px-6 py-8 mx-auto">
        <Routes>
          <Route path="/" element={<LeadHome />} />
          <Route path="showDetails/:id" element={<UserShowDetails />} />
        </Routes>
      </div>
    </main>
  );
};

export default UserLeadContainer;
