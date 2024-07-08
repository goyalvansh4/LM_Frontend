import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import {
  MdOutlineAssignmentInd,
  MdOutlineAssignmentLate,
  MdSevereCold,
} from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import GlobalAxios from "../Global/GlobalAxios";

const Card = () => {
  const [leadStat, setLeadStat] = useState([]);
  const [userStat, setUserStat] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    assigned: 0,
    notAssigned: 0,
  });
  const [leadTypes, setLeadTypes] = useState({
    hot: 0,
    warm: 0,
    cold: 0,
  });

  const [rtoStat, setRtoStat] = useState(0);

  useEffect(() => {
    const fetchLeadStats = async () => {
      try {
        const response = await GlobalAxios.get(`/admin/leads_static`);
        const data = response.data.data;
        setLeadStat(data);
        console.log("Card",data);
        setLeadTypes({
          hot: data.map((lead) => {
            if(lead.name === "hot")
             return lead.leads_count
          }),
          warm: data.map((lead) => {
            if(lead.name === "warm")
             return lead.leads_count
          }),
          cold: data.map((lead) => {
            if(lead.name === "cold")
             return lead.leads_count
          }),
        });
      } catch (error) {
        console.error("Error fetching lead stats:", error);
      }
    };

    const fetchUserStats = async () => {
      try {
        const response = await GlobalAxios.get(`/admin/users_static`);
        const data = response.data;
        setUserStat(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchLeadStats();
    fetchUserStats();
  }, []);

  useEffect(() => {
    const fetchLeadStats = async () => {
      try {
       const response = await GlobalAxios.get(`/admin/dashboardStatics`);
       console.log(response.data);

       if(response.data.status === "success"){
         setUserStat({
            total: response.data.user_statistics.total_users,
            active: response.data.user_statistics.active_users,
            inactive: response.data.user_statistics.inactive_users,
            assigned: response.data.lead_statistics.assigned_count,
            notAssigned: response.data.lead_statistics.not_assigned_count,
         });
         setRtoStat(response.data.rto_statistics.total_rto);
       }
      } catch (error) {
        console.error("Error fetching lead stats:", error);
      }
    }

    fetchLeadStats();
    
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <p className="text-4xl dark:text-white text-black">Welcome</p>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <button className="btn btn-primary">Filter</button>
          <button className="btn btn-secondary">Datepicker</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Leads Progress Bar */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <SiGoogleads className="text-blue-500 text-4xl mb-4" />
          <CircularProgressbar
            value={
              (leadStat.reduce((acc, lead) => {
                return acc + lead.leads_count;
              }, 0) / 1000)*100
            }
            text={`${leadStat.reduce((acc, lead) => {
              return acc + lead.leads_count;
            }, 0)}`}
            styles={buildStyles({
              textSize: "24px",
              pathColor: "#3b82f6",
              textColor: "#3b82f6",
            })}
          />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Total Leads
          </h3>
        </div>

        {/* Total Users Progress Bar */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUsers className="text-green-500 text-4xl mb-4" />
          <CircularProgressbar
            value={userStat.total}
            text={`${userStat.total}`}
            styles={buildStyles({
              textSize: "24px",
              pathColor: "#10b981",
              textColor: "#10b981",
            })}
          />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Total Users
          </h3>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <IoLocation className="text-green-500 text-4xl mb-4" />
          <CircularProgressbar
            value={rtoStat}
            text={`${rtoStat}`}
            styles={buildStyles({
              textSize: "24px",
              pathColor: "#10b981",
              textColor: "#10b981",
            })}
          />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Total RTO
          </h3>
        </div>

        {/* Active Users */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUserCheck className="text-green-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Active Users
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {userStat.active}
          </p>
        </div>

        {/* Inactive Users */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUserTimes className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Inactive Users
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {userStat.inactive}
          </p>
        </div>

        {/* Hot Leads */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <AiOutlineFire className="text-yellow-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Hot Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {leadTypes.hot}
          </p>
        </div>

        {/* Warm Leads */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <AiOutlineClockCircle className="text-green-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Warm Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {leadTypes.warm}
          </p>
        </div>

        {/* Cold Leads */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <MdSevereCold className="text-blue-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Cold Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {leadTypes.cold}
          </p>
        </div>

        {/* Assigned Leads */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <MdOutlineAssignmentInd className="text-green-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Assigned Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {userStat.assigned}
          </p>
        </div>

        {/* Not Assigned Leads */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <MdOutlineAssignmentLate className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Not Assigned Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {userStat.notAssigned}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
