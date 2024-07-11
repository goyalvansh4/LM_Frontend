import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalAxios from "../../../../../Global/GlobalAxios";
import { HashLoader } from "react-spinners";
import moment from "moment";
import BackButton from "../../../../../components/Button/BackButton";
import { toast } from "react-toastify";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

const ShowDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState({
    register_number: "",
    rto_location_name: "",
    register_date: "",
    customer_name: "",
    customer_mobile: "",
    address: "",
    status_name: "",
    assign_to: "",
    assign_at: "",
    due_date: "",
    remarks: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [remarkText, setRemarkText] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await GlobalAxios.get(`/admin/leads/${id}?full=true`);
        const data = response.data.data;
        setLead(data);
        setLoading(false);
        setRemarkText(data.remarks || "");
      } catch (error) {
        console.error("Error fetching lead details:", error);
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemark = (e) => {
    setRemarkText(e.target.value);
  };

  const saveRemark = async () => {
    let data = {
      lead_id: id,
      remark_text: remarkText,
    };

    try {
      const response = await GlobalAxios.post(`/admin/leads_remark`, data);
      console.log(response.data);
      if (response.data.status === "success") {
        setLead({ ...lead, remarks: remarkText });
        toast.success("Remark added successfully!");
        closeModal();
      } else {
        toast.error("Failed to add remark!");
      }
    } catch (error) {
      console.error("Error adding remark:", error);
      toast.error("Failed to add remark!");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDateClick = async () => {
    const data = {
      lead_id: id,
      due_date: date,
    };
    try {
      const response = await GlobalAxios.post(`/admin/leads_dueDate`, data);
      if (response.data.status === "success") {
        setLead({ ...lead, due_date: date });
        toast.success("Follow up date set successfully!");
      } else {
        toast.error("Failed to set follow up date!");
      }
    } catch (error) {
      console.error("Error setting follow up date:", error);
      toast.error("Failed to set follow up date!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={50} color={"#4A90E2"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-10 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-black dark:text-gray-200 mb-10">
        Lead Details
      </h1>

      {/* Lead Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
          <span className="mx-4 text-lg font-medium text-black dark:text-gray-200">
            Lead
          </span>
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Registration Number
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.register_number}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Registration Date
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.register_date}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              RTO Location
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.rto_location_name}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Status
            </label>
            <p
              className={`text-lg ${
                lead.status_name.toLowerCase() === "active"
                  ? "text-green-600"
                  : "text-red-600"
              } uppercase`}
            >
              {lead.status_name}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
          <span className="mx-4 text-lg font-medium text-black dark:text-gray-200">
            Customer
          </span>
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Customer Name
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.customer_name}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Phone No
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.customer_mobile}
            </p>
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Address
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.address}
            </p>
          </div>
        </div>
      </div>

      {/* Lead Assign Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
          <span className="mx-4 text-lg font-medium text-black dark:text-gray-200">
            Lead Assign
          </span>
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Assigned User
            </label>
            <p
              className={`text-lg ${
                !lead.assign_to_name
                  ? "text-red-600"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {lead.assign_to_name || "Not Assigned"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Assigned At
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.assign_at}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
          <span className="mx-4 text-lg font-medium text-black dark:text-gray-200">
            Follow Up
          </span>
          <hr className="flex-grow border-gray-400 dark:border-gray-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Due Date
            </label>
            <p className="text-lg text-gray-800 dark:text-gray-100">
              {lead.due_date
                ? moment(lead.due_date).format("D - MMMM - YYYY")
                : "Not Set"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Add Follow Up
            </label>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleDateChange}
                value={date}
                type="date"
                min={moment().format("YYYY-MM-DD")}
                className="w-full px-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleDateClick}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <hr className="flex-grow border-gray-400 dark:border-gray-700" />
        <span className="mx-4 text-base font-medium text-black dark:text-gray-200">
          Remarks
        </span>
        <hr className="flex-grow border-gray-400 dark:border-gray-700" />
      </div>
      <div className="relative p-6 border border-gray-300">
        <div className="relative">
          <BiSolidMessageSquareDetail className="absolute top-0 left-0 text-blue-900 text-2xl" />
          <p className="pl-8 text-base text-gray-800 dark:text-gray-100 mb-4">
            {lead.remarks || "No Remarks Yet..."}
          </p>
        </div>
      </div>

      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={openModal}
      >
        {lead.remarks ? "Change Remark" : "Add Remark"}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-[60%] p-6 rounded-xl shadow-2xl dark:bg-gray-800 dark:text-gray-200">
            <h2 className="text-lg font-medium text-black dark:text-gray-100 mb-4">
              {lead.remarks ? "Change Remark" : "Add Remark"}
            </h2>
            <textarea
              value={remarkText}
              onChange={handleRemark}
              rows={5}
              className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300"
              placeholder={"Add Remark..."}
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
                onClick={saveRemark}
              >
                {lead.remarks ? "Change" : "Add"}
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <br />
      <div className="mt-6">
        <BackButton url="/admin/leads" />
      </div>
    </div>
  );
};

export default ShowDetails;
