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
import GlobalAxios from "../../../Global/GlobalAxios";
import { RandomColor } from "../../../utils/RandomColor";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

const Card = () => {
  const icons = [
    { component: AiOutlineFire },
    { component: AiOutlineClockCircle },
    { component: MdSevereCold },
  ];

  const [stat, setStat] = useState({
    totallead: 0,
    activeuser: 0,
    inactiveuser: 0,
    assignedlead: 0,
    notAssignedlead: 0,
    totaluser: 0,
    totalrto: 0,
    leadType: [],
  });
 const [pieData, setPieData] = useState([]);
 const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchLeadStats = async () => {
      try {
        const response = await GlobalAxios.get(`/admin/dashboardStatics`);

        if (response.data.status === "success") {
          setStat({
            totaluser: response.data.user_statistics.total_users,
            activeuser: response.data.user_statistics.active_users,
            inactiveuser: response.data.user_statistics.inactive_users,
            assignedlead: response.data.lead_statistics.assigned_count,
            notAssignedlead: response.data.lead_statistics.not_assigned_count,
            totallead: response.data.lead_statistics.lead_count,
            totalrto: response.data.rto_statistics.total_rto,
            leadType: response.data.status_statistics,
          });
          setPieData(response.data.status_statistics);
          setBarData(response.data.users);
        }
      } catch (error) {
        console.error("Error fetching lead stats:", error);
      }
    };

    fetchLeadStats();
  }, []);


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <p className="text-4xl dark:text-white text-black">Welcome</p>
      </div>

      {/* Top three progress bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <SiGoogleads className="text-blue-500 text-4xl mb-4" />
          <CircularProgressbar
            value={stat.totallead}
            text={stat.totallead}
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

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUsers className="text-green-500 text-4xl mb-4" />
          <CircularProgressbar
            value={stat.totaluser}
            text={stat.totaluser}
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
            value={stat.totalrto}
            text={stat.totalrto}
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
      </div>

      {/* Graphs row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 p-4 bg-white rounded-lg shadow-md dark:bg-gray-500 dark:text-white">
        <div style={{ height: "400px" }} className="dark:text-white">
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: "nivo" }}
            borderWidth={3}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={10}
            radialLabelsTextColor={"white"}
            radialLabelsLinkOffset={10}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: "color" }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor={"white"}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
        <div style={{ height: "400px" }}>
          <ResponsiveBar
            data={barData}
            keys={["value"]}
            indexBy="name"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={
              {
                tickPadding: 5, 
              }
            }
            axisRight={null}
            axisBottom={{
              tickSize: 15,
              tickPadding: 0,
              tickRotation: 0,
              legend: "Users",
              legendPosition: "middle",
              legendOffset: 45,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "leads",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            enableLabel={true}
            label={(d) => `${d.value}`}
            labelTextColor="black"
            labelTextDY={-10} // Position the label on top of the bar
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
              `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
            }
          />
        </div>
      </div>

      {/* Other cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <MdOutlineAssignmentInd className="text-green-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Assigned Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {stat.assignedlead}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <MdOutlineAssignmentLate className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Not Assigned Leads
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {stat.notAssignedlead}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUserCheck className="text-green-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Active Users
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {stat.activeuser}
          </p>
        </div>

        <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <FaUserTimes className="text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold dark:text-white mt-4">
            Inactive Users
          </h3>
          <p className="text-2xl font-bold dark:text-gray-400 mt-2">
            {stat.inactiveuser}
          </p>
        </div>

        {stat.leadType.map((lead, index) => {
          const IconComponent = icons[index % 3].component;
          const color = RandomColor();
          return (
            <div
              key={lead.id}
              className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <IconComponent style={{ color }} className="text-4xl mb-4" />
              <h3 className="uppercase text-xl font-semibold dark:text-white mt-4">
                {lead.label}
              </h3>
              <p className="text-2xl font-bold dark:text-gray-400 mt-2">
                {lead.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
