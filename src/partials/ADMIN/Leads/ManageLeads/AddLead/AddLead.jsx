import React, { useEffect, useState } from "react";
import FetchData from "./FetchData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "../main.css";
import GlobalAxios from "../../../../../Global/GlobalAxios";
import { Navigate } from "react-router-dom";
import BackButton from "../../../../../components/Button/BackButton";

function AddLead() {
  const [rtoLocations, setRtoLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [rtostate, setRto_state] = useState([]);
  const [status, setStatus] = useState([]);
  const navigate = Navigate;

  useEffect(() => {
    FetchData().then((data) => {
      setRtoLocations(data.data);
    });
  }, []);

  useEffect(() => {
    const response = GlobalAxios.get("/admin/state");
    response.then((data) => {
      setRto_state(data.data.states);
    });
  }, []);

  useEffect(() => {
    const response = GlobalAxios.get("/admin/leadstatus");
    response.then((data) => {
      setStatus(data.data.data);
    });
  }, []);

  const [formData, setFormData] = useState({
    register_number: "",
    rto_location: null,
    register_date: "",
    customer_name: "",
    customer_mobile: "",
    address: "",
    status: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    try {
      const response = await GlobalAxios.post("/admin/leads", formData);
      setLoading(false);
      if (response.data.status === "success") {
        toast.success("Lead added successfully!");
        setFormData({
          register_number: "",
          rto_location: null,
          register_date: "",
          customer_name: "",
          customer_mobile: "",
          address: "",
          status: null,
        });
        setTimeout(() => {
          navigate("/admin/leads");
        }, 3000);
      } else {
        toast.error(response.data.message);
        if (
          response.data.status === "error" &&
          response.data.message === "Validation error"
        ) {
          const errorData = response.data.errors;
          const newValidationErrors = {};
          for (const key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              newValidationErrors[key] = errorData[key][0];
            }
          }
          setValidationErrors(newValidationErrors);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error posting data:", error);
    }
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    const response = GlobalAxios.get(`/admin/rtolocations/state/${value}`);
    response.then((data) => {
      setRtoLocations(data.data.data);
    });
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100 dark:bg-gray-900 lg:px-4 transition-colors duration-300">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
          Add New Lead
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Registration No:
              </label>
              <input
                type="text"
                name="register_number"
                value={formData.register_number}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Registration No"
              />
              {validationErrors.register_number && (
                <p className="text-red-600 text-sm">
                  {validationErrors.register_number}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Select RTO State:
              </label>
              <select
                name="rto_state"
                onChange={handleStateChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select State</option>
                {rtostate.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                RTO Location:
              </label>
              <select
                name="rto_location"
                value={formData.rto_location || ""}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select RTO Location</option>
                {rtoLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              {validationErrors.rto_location && (
                <p className="text-red-600 text-sm">
                  {validationErrors.rto_location}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Registration Date:
              </label>
              <input
                type="date"
                name="register_date"
                value={formData.register_date}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
              {validationErrors.register_date && (
                <p className="text-red-600 text-sm">
                  {validationErrors.register_date}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Customer Name:
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Customer Name"
              />
              {validationErrors.customer_name && (
                <p className="text-red-600 text-sm">
                  {validationErrors.customer_name}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Phone No:
              </label>
              <input
                type="tel"
                name="customer_mobile"
                value={formData.customer_mobile}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Phone No"
              />
              {validationErrors.customer_mobile && (
                <p className="text-red-600 text-sm">
                  {validationErrors.customer_mobile}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Customer Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Address"
              />
              {validationErrors.address && (
                <p className="text-red-600 text-sm">
                  {validationErrors.address}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Status:
              </label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                {status.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              {validationErrors.status && (
                <p className="text-red-600 text-sm">
                  {validationErrors.status}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <button
              type="submit"
              className="py-3 px-6 text-white bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-lg rounded-lg font-semibold shadow-md transition-colors duration-300"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#FFF"} /> : "Add Lead"}
            </button>
            <BackButton url="/admin/leads" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLead;
