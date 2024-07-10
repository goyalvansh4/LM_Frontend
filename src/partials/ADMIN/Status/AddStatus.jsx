import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlobalAxios from "../../../Global/GlobalAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStatus = () => {
  const [status, setStatus] = useState([]);
  const [statusName, setStatusName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editStatusId, setEditStatusId] = useState(null);
  const [deleteStatusId, setDeleteStatusId] = useState(null);
  const [deleteCheckboxChecked, setDeleteCheckboxChecked] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await GlobalAxios.get("admin/leadstatus");
        if (response.data.status === "success") {
          setStatus(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatus();
  }, []);

  const handleStatusChange = (e) => {
    setStatusName(e.target.value);
    setErrorMessage("");
  };

  const handleAddOrUpdateStatus = async () => {
    if (statusName === "") {
      alert("Please enter status");
      return;
    }

    setLoading(true);

    const newStatus = { name: statusName };

    try {
      if (editMode) {
        const response = await GlobalAxios.put(
          `admin/leadstatus/${editStatusId}`,
          newStatus
        );
        if (response.data.status === "success") {
          const updatedStatus = status.map((s) =>
            s.id === editStatusId ? response.data.data : s
          );
          setStatus(updatedStatus);
          toast.success("Status updated successfully!");
        } else {
          setErrorMessage(response.data.message);
        }
      } else {
        const response = await GlobalAxios.post("admin/leadstatus", newStatus);
        if (response.data.status === "success") {
          setStatus([...status, response.data.data]);
          toast.success("Status added successfully!");
        } else {
          setErrorMessage(response.data.message);
        }
      }
      setStatusName("");
      setEditMode(false);
      setEditStatusId(null);
    } catch (error) {
      if (
        error.response &&
        error.response.data.errors &&
        error.response.data.errors.name
      ) {
        setErrorMessage(error.response.data.errors.name[0]);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStatus = async () => {
    if (!deleteCheckboxChecked) return;

    setLoading(true);
    try {
      const response = await GlobalAxios.delete(
        `admin/leadstatus/${deleteStatusId}`
      );
      if (response.data.status === "success") {
        const filteredStatus = status.filter((s) => s.id !== deleteStatusId);
        setStatus(filteredStatus);
        toast.success("Status deleted successfully!");
        setDeleteStatusId(null);
        setDeleteCheckboxChecked(false);
      } else {
        toast.error("Failed to delete status");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (status) => {
    setStatusName(status.name);
    setEditMode(true);
    setEditStatusId(status.id);
  };

  const handleDeleteClick = (id) => {
    setDeleteStatusId(id);
  };

  const handleCheckboxChange = (e) => {
    setDeleteCheckboxChecked(e.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col  p-6">
        <p className="text-xl text-[#000] text-center font-semibold">Status</p>
        <label
          htmlFor="status"
          className="mb-2 text-lg font-semibold text-gray-700"
        >
          {editMode ? "Edit Status" : "Add Status"}
        </label>
        <motion.input
          type="text"
          id="status"
          value={statusName}
          onChange={handleStatusChange}
          className="w-full max-w-md px-4 py-2 mb-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          whileFocus={{ scale: 1.05 }}
          required
          placeholder="Please enter status...e.g., hot, warm, cold, dnd, etc."
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
        <motion.button
          onClick={handleAddOrUpdateStatus}
          className="w-[100px] px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : editMode ? (
            "Update"
          ) : (
            "Add"
          )}
        </motion.button>
      </div>
      <div className="w-full p-6">
        <table className="w-[350px] border">
          <thead>
            <tr className="border flex justify-between px-2">
              <th className="w-1/4">Sr No.</th>
              <th className="w-1/4">Status</th>
              <th className="w-1/4">Edit</th>
              <th className="w-1/4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {status.map((status, index) => {
              return (
                <tr
                  key={status.id}
                  className="border flex justify-between py-2 px-2"
                >
                  <td className="text-center w-1/4">{index + 1}</td>
                  <td className="text-center w-1/4 uppercase">{status.name}</td>
                  <td className="text-center w-1/4">
                    <button
                      className="text-blue-500"
                      onClick={() => handleEditClick(status)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-center w-1/4">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteClick(status.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {deleteStatusId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this status?</p>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              yes,I want to delete status
            </label>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteStatusId(null)}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 ${
                  deleteCheckboxChecked ? "bg-red-500" : "bg-red-300"
                } text-white rounded`}
                onClick={handleDeleteStatus}
                disabled={!deleteCheckboxChecked || loading}
              >
                {loading ? "Loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStatus;
