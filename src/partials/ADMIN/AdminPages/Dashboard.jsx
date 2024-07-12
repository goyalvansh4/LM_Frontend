import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../../Header";
import Card from "./Card";
import LeadContainer from "../Leads/LeadContainer";
import UserContainer from "../Users/UserContainer";
import AddStatus from "../Status/AddStatus";
import AddRto from "../RTO/AddRto";
import useAuth from "../../../hooks/useAuth";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [firstTimeFetch, setFirstTimeFetch] = useState(true);

  useEffect(() => {
    const reload = () => {
      setFirstTimeFetch(false);
      if (token && role === "admin") {
        navigate(); // Forces a page reload
      }
    };
    if (firstTimeFetch) {
      reload();
      setFirstTimeFetch(false);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="leads/*" element={<LeadContainer />} />
            <Route path="users/*" element={<UserContainer />} />
            <Route path="addStatus" element={<AddStatus />} />
            <Route path="addRTO" element={<AddRto />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
