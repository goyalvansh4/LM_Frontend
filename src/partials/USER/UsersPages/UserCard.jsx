import React, { useEffect, useState } from "react";
import { SiGoogleads } from "react-icons/si";
import { AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import {
  MdSevereCold,
} from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import GlobalAxios from "../../../Global/GlobalAxios";

const UserCard = () => {
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
            {leadTypes.hot}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <IoLocation className="text-green-500 text-4xl mb-4" />

          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Total RTO
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {leadTypes.hot}
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

        {/* Not Assigned Leads */}
      </div>
    </div>
  );
};

export default UserCard;
