import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserSidebar from "../UserSidebar";
import Header from "../../Header";
import UserCard from "./UserCard";
import UserLeadContainer from "../UserLeads/UserLeadContainer";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route path="/" element={<UserCard />} />
            <Route path="leads/*" element={<UserLeadContainer />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
