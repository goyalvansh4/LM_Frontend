import React, { useEffect, useState } from "react";
import LeadsData from "./LeadsData/LeadsData";
import { HashLoader } from "react-spinners";
import FilterComponent from "./Filters/FilterComponent";
import { useNavigate } from "react-router-dom";
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
  const [selectedRto, setSelectedRto] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setLoading(true); // Start loading
    LeadsData(currentPage).then((data) => {
      setLeadData(data.data);
      setPagination({
        total_pages: data.paginate_data.total_pages,
        total_rows: data.paginate_data.total_rows,
      });
      setLoading(false); // Stop loading
    });
  }, [currentPage]);

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
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        });
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        toast.error("Unauthenticated");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const applyFilter = async () => {
    setLoading(true); // Start loading
    let data = await LeadsData(
      currentPage,
      selectedRto,
      selectedYear,
      selectedStatus
    );

    console.log(data.data);
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
      LeadsData(currentPage, selectedRto);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setLoading(true); // Start loading
      LeadsData(currentPage, selectedRto, selectedYear);
    }
  };

  return (
    <>
      <FilterComponent
        selectedRto={selectedRto}
        selectedYear={selectedYear}
        selectedStatus={selectedStatus}
        setSelectedRto={setSelectedRto}
        setSelectedYear={setSelectedYear}
        setSelectedStatus={setSelectedStatus}
        applyFilter={applyFilter}
      />
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
                  Address
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
                <tr key={lead.id} className="dark:bg-gray-800">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900 dark:text-gray-300">
                          {currentPage * 10 - 10 + index + 1}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 dark:border-gray-700">
                    <div className="text-sm leading-5 text-gray-500 dark:text-gray-300">
                      {lead.register_number}
                    </div>
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
                      {lead.address}
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
              <p className="text-center">Are you sure</p>
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
