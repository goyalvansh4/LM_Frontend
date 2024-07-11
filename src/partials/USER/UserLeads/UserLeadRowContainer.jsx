import React, { useEffect, useState } from "react";
import UserLeadsData from "./UserLeadsData/UserLeadsData";
import { HashLoader } from "react-spinners";
import FilterComponent from "./UserFilters/UserFilterComponent";
import { NavLink, useNavigate } from "react-router-dom";

const UserLeadRowContainer = () => {
  const [leadData, setLeadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total_rows: 0,
    total_pages: 0,
  });
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true); // Start loading
    //sessionStorage.setItem("leads_page", currentPage);
    window.page = currentPage;
    UserLeadsData().then((data) => {
      setLeadData(data.data);
      setPagination({
        total_pages: data.paginate_data.total_pages,
        total_rows: data.paginate_data.total_rows,
      });
      setLoading(false); // Stop loading
    });
  }, [currentPage]);


  const applyFilter = async () => {
    setLoading(true); // Start loading
    //sessionStorage.setItem("leads_page", currentPage);
    window.page = currentPage;
    let data = await UserLeadsData();
    setLeadData(data.data);
    setPagination({
      total_pages: data.paginate_data.total_pages,
      total_rows: data.paginate_data.total_rows,
    });
    setLoading(false); // Stop loading
  };

  const handleNext = () => {
    if (pagination.total_pages > currentPage) {
      setCurrentPage(currentPage + 1);
      setLoading(true); // Start loading
      //sessionStorage.setItem("leads_page", currentPage);
      window.page = currentPage;
      const response = UserLeadsData();
      setLeadData(response.data);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoading(true); // Start loading
      //sessionStorage.setItem("leads_page", currentPage);
      window.page = currentPage;
      const response = UserLeadsData();
      setLeadData(response.data);
    }
  };


  return (
    <>
      <FilterComponent applyFilter={applyFilter} />
      {loading ? (
        <div className="flex justify-center py-16 items-center h-full dark:bg-gray-900">
          <HashLoader color="#7B74EC" size={50} />
        </div>
      ) : (
        <>
          <table className="min-w-full dark:bg-gray-900">
            <thead>
              <tr>
                <th className="pl-9 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  S.No
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Registration Number
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  RTO Location
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Registration Date
                </th>
                <th className=" py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Customer Name
                </th>
                <th className=" py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Phone No
                </th>
                <th className=" py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {leadData.map((lead, index) => (
                <tr
                  key={lead.id}
                  className={`dark:bg-gray-800 ${
                    lead.assign_to_name === "-" ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  <td className="pl-9 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <NavLink
                      to={`/user/leads/showDetails/${lead.id}`}
                      className="text-sm leading-5 text-gray-500 dark:text-gray-300 underline py-2"
                    >
                      {lead.register_number}
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-900 dark:text-gray-300">
                      {lead.rto_location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                      {lead.register_date}
                    </div>
                  </td>
                  <td className=" text-xl px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                      {lead.customer_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                      {lead.customer_mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300 uppercase">
                      {lead.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full p-4 flex justify-between gap-2 items-center dark:bg-gray-900">
            <div className="">
              <p className="text-gray-500 dark:text-gray-300">
                Showing {currentPage} to {pagination.total_pages} of{" "}
                {pagination.total_rows} entries
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="bg-gray-900 rounded-xl text-white font-medium text-lg py-2 px-4 dark:bg-gray-700"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-900 rounded-xl text-white font-medium text-lg py-2 px-4 dark:bg-gray-700"
                disabled={currentPage === pagination.total_pages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UserLeadRowContainer;
