import React, { useEffect, useState } from "react";
import LeadsData from "./LeadsData/LeadsData";
import { ClipLoader, HashLoader } from "react-spinners";
import FilterComponent from "./Filters/FilterComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";
import GlobalAxios from "../../../Global/GlobalAxios";

const LeadRowContainer = () => {
  const [leadData, setLeadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteLeadId, setDeleteLeadId] = useState(0);
  const [pagination, setPagination] = useState({
    total_rows: 0,
    total_pages: 0,
  });
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [Assignloading, setAssignLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading
    //sessionStorage.setItem("leads_page", currentPage);
    window.page = currentPage;
    LeadsData().then((data) => {
      setLeadData(data.data);
      setPagination({
        total_pages: data.paginate_data.total_pages,
        total_rows: data.paginate_data.total_rows,
      });
      setLoading(false); // Stop loading
    });
  }, [currentPage]);

  // useEffect(() => {
  //   // Update select all checkbox based on individual checkboxes
  //   const allChecked = leadData.every((lead) => lead.checked);
  //   setSelectAllChecked(allChecked);
  // }, [leadData]);

  const applyFilter = async () => {
    setLoading(true); // Start loading
    //sessionStorage.setItem("leads_page", currentPage);
    window.page = currentPage;
    let data = await LeadsData();
    setLeadData(data.data);
    setPagination({
      total_pages: data.paginate_data.total_pages,
      total_rows: data.paginate_data.total_rows,
    });
    setLoading(false); // Stop loading
  };

  const toggleSelectAll = () => {
    const updatedData = leadData.map((lead) => ({
      ...lead,
      checked: !selectAllChecked,
    }));
    setLeadData(updatedData);
    setSelectAllChecked(!selectAllChecked);
  };

  const handleCheckboxChange = (index) => {
    const updatedData = [...leadData];
    updatedData[index].checked = !updatedData[index].checked;
    setLeadData(updatedData);
  };

  const handleAssignLead = async () => {
    setAssignLoading(true);
    const selectedLeadIds = leadData
      .filter((lead) => lead.checked)
      .map((lead) => lead.id);

    let data = {
      selectedLead: selectedLeadIds,
      selectedUser: selectedUser,
    };

    try {
      const response = await GlobalAxios.post("/admin/leads_assign", data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setAssignLoading(false);
        LeadsData().then((data) => {
          setLeadData(data.data);
          // setPagination({
          //   total_pages: data.paginate_data.total_pages,
          //   total_rows: data.paginate_data.total_rows,
          // });
          setLoading(false); // Stop loading
        });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await GlobalAxios.get("/admin/usersforlead");
      setUserList(response.data.data);
    };

    fetchUser();
  }, []);

  const handleNext = () => {
    if (pagination.total_pages > currentPage) {
      setCurrentPage(currentPage + 1);
      setLoading(true); // Start loading
      //sessionStorage.setItem("leads_page", currentPage);
      window.page = currentPage;
      const response = LeadsData();
      setLeadData(response.data);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoading(true); // Start loading
      //sessionStorage.setItem("leads_page", currentPage);
      window.page = currentPage;
      const response = LeadsData();
      setLeadData(response.data);
    }
  };

  const handleEditClick = (leadId) => {
    navigate(`/admin/leads/edit/${leadId}`);
  };

  const handleModal = (id) => {
    setDeleteLeadId(id);
    document.getElementById("my_modal_5").showModal();
  };

  const handleDeleteLead = async (id) => {
    let url = `/admin/leads/${id}`;
    try {
      const response = await GlobalAxios.delete(url);
      if (response.data.status === "success") {
        toast.success("Lead Deleted Successfully");
        LeadsData(currentPage).then((data) => {
          setLeadData(data.data);
          setPagination({
            total_pages: data.paginate_data.total_pages,
            total_rows: data.paginate_data.total_rows,
          });
          document.getElementById("my_modal_5").close();
          setLoading(false); // Stop loading
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Unauthenticated");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <FilterComponent applyFilter={applyFilter} />
      <div>
        <div
          className="w-[320px] py-4 px-8 bg-white rounded-xl my-4 shadow-md border border-gray-200
        flex gap-8 items-center dark:bg-gray-900"
        >
          <select
            name=""
            id=""
            onChange={(e) => setSelectedUser(e.target.value)}
            className=" border dark:bg-white dark:text-gray-800 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">Select User</option>
            {userList.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {selectedUser && (
            <button
              className="px-4 py-2 bg-gray-900 dark:bg-[#fff] dark:text-[#000] text-white rounded-xl"
              onClick={handleAssignLead}
            >
              {Assignloading ? (
                <ClipLoader size={20} color={"#FFF"} />
              ) : (
                "Assign"
              )}
            </button>
          )}
        </div>
      </div>
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
                  <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={toggleSelectAll}
                  />
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
                  Assign To
                </th>
                <th className=" py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Status
                </th>
                <th className=" py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  Action
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
                    {lead.assign_to_name === "-" ? (
                      <input
                        type="checkbox"
                        checked={lead.checked || false}
                        onChange={() => handleCheckboxChange(index)}
                        data-id={lead.id}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={lead.checked || false}
                        onChange={() => handleCheckboxChange(index)}
                        data-id={lead.id}
                        disabled
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <NavLink
                      to={`/admin/leads/showDetails/${lead.id}`}
                      className="text-sm leading-5 text-gray-500 dark:text-gray-300"
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
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                      {lead.assign_to_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300 uppercase">
                      {lead.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex flex-col gap-2 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEditClick(lead.id)}
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleModal(lead.id)}
                      href="#"
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle rounded-3xl"
          >
            <div className="modal-box py-12 flex flex-col gap-4 justify-center  px-8 dark:bg-gray-800 dark:text-gray-200">
              <h3 className="font-bold flex justify-center">
                <RiDeleteBinFill className="text-red-400 text-6xl text-center" />
              </h3>
              <p className="text-center">Are you sure?</p>
              <p className="text-center">
                Do you really want to delete this lead?
              </p>
              <div className="modal-action">
                <form
                  method="dialog"
                  className="flex justify-center gap-4 items-center"
                >
                  <button className="px-4 py-2 bg-white text-black rounded-xl border-2 dark:bg-gray-700 dark:text-gray-300">
                    Close
                  </button>
                  <button
                    onClick={() => handleDeleteLead(deleteLeadId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl border-2"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
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
export default LeadRowContainer;
