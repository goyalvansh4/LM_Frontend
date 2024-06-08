import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Card from "./Card";
import LeadContainer from "../partials/CRM/Leads/LeadContainer";
import {Route, Routes } from "react-router-dom";
import UserContainer from "../partials/CRM/Users/UserContainer";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          {/* <Card /> */}
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/leads" element={<LeadContainer />} />
            <Route path="/users" element={<UserContainer />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
