import React, { useEffect, useState } from "react";
import GlobalAxios from "../../../../Global/GlobalAxios";

const FilterComponent = ({ applyFilter }) => {
  const [states, setStates] = useState([]);
  const [rtoLocations, setRtoLocations] = useState([]);
  const [years, setYears] = useState([]);
  const [statuses, setStatuses] = useState([]);
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedRto, setSelectedRto] = useState(window.rto_location || "");
  const [selectedYear, setSelectedYear] = useState(window.year || "");
  const [selectedStatus, setSelectedStatus] = useState(window.status || "");

  const [selectedPerPage, setSelectedPerPage] = useState(window.per_page || "");

  // Fetch filter data from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await GlobalAxios.get("/user/leads_filters");
        const data = response.data.data;
        setStates(data.state);
        setYears(data.years);
        setStatuses(data.lead_status);

        // Default selected state is empty
        setSelectedState("");
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  // Fetch RTO Locations based on the selected state
  useEffect(() => {
    const fetchRtoLocations = async () => {
      if (selectedState) {
        try {
          const response = await GlobalAxios.get(
            `/user/rtolocations/state/${selectedState}`
          );
          setRtoLocations(response.data.data);
        } catch (error) {
          console.error("Error fetching RTO locations:", error);
        }
      } else {
        setRtoLocations([]);
      }
    };

    fetchRtoLocations();
  }, [selectedState]);

  

  const handleFilter = () => {
    window.state = selectedState;
    window.rto_location = selectedRto;
    window.year = selectedYear;
    window.status = selectedStatus;
    window.per_page = selectedPerPage;

    applyFilter();
  };

  const handleReset = () => {
    window.location.href = window.location.href;
    return;
  };

  return (
    <div className="p-4 bg-white rounded-xl my-4 shadow-md border border-gray-200">
      {/* Filter Container */}
      <div className="flex flex-wrap justify-between gap-4 items-center">
        {/* State Filter */}
        <div className="flex flex-col w-full sm:w-1/5">
          <label className="text-gray-700 font-semibold mb-1">State</label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedRto(""); // Reset RTO when state changes
            }}
            className="p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* RTO Filter */}
        <div className="flex flex-col w-full sm:w-1/5">
          <label className="text-gray-700 font-semibold mb-1">
            RTO Location
          </label>
          <select
            value={selectedRto}
            onChange={(e) => setSelectedRto(e.target.value)}
            className={`p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${
              !selectedState ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={!selectedState}
          >
            <option value="">Select RTO Location</option>
            {rtoLocations.map((rto) => (
              <option key={rto.id} value={rto.id}>
                {rto.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="flex flex-col w-full sm:w-1/5">
          <label className="text-gray-700 font-semibold mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col w-full sm:w-1/5">
          <label className="text-gray-700 font-semibold mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        

        {/* Users Filter */}

        <div className="flex flex-col w-full sm:w-1/5">
          <label className="text-gray-700 font-semibold mb-1">Per Page</label>
          <select
            value={selectedPerPage}
            onChange={(e) => setSelectedPerPage(e.target.value)}
            className="p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select Page</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Apply Filter Button */}
        <div className="w-1/5 flex gap-4 items-center mt-2">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-gray-900 text-white rounded-xl"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
