import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserSidebar from "../UserSidebar";
import Header from "../../Header";
import UserCard from "./UserCard";
import UserLeadContainer from "../UserLeads/UserLeadContainer";
import useAuth from "../../../hooks/useAuth";

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [firstTimeFetch, setFirstTimeFetch] = useState(true);

  useEffect(() => {
    const reload = () =>{
      setFirstTimeFetch(false)
      if (token && role === "user") {
        navigate(); // Forces a page reload  
      }
    }
    if(firstTimeFetch){
      reload()
      setFirstTimeFetch(false)
    } 
  }, []);

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
