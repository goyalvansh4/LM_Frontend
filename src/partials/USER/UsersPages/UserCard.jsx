import React, { useEffect, useState } from "react";
import { SiGoogleads } from "react-icons/si";
import { AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import {
  MdSevereCold,
} from "react-icons/md";
import GlobalAxios from "../../../Global/GlobalAxios";
import { RandomColor } from "../../../utils/RandomColor";

const UserCard = () => {
  const [leadStat, setLeadStat] = useState({
     total: 0,
      type:[],
  });

  const icons = [
    { component: AiOutlineFire },
    { component: AiOutlineClockCircle},
    { component: MdSevereCold}
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await GlobalAxios.get(`/user/leads_static`);
        setLeadStat({
          total: response.data.count,
          type: response.data.data,
        });
      } catch (error) {
        console.error("Error fetching leads:", error);
        throw error;
      }
    };
    fetch();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <p className="text-4xl dark:text-white text-black">Welcome</p>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Leads Progress Bar */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <SiGoogleads className="text-blue-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Total Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {leadStat.total}
          </p>
        </div>

        {/* Hot Leads */}
        {leadStat.type.map((lead, index) => {
          const IconComponent = icons[index%3].component;
          return <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <IconComponent
           style={{
            color: RandomColor(),
           }} 
           className="text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            {lead.name}
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {lead.lead_count}
          </p>
        </div>
        })}

        
      </div>
    </div>
  );
};

export default UserCard;
