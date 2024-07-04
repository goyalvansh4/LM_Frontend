import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader, HashLoader } from "react-spinners";
import "../main.css";
import EditLeadData from "./EditLeadData";
import { useNavigate, useParams } from "react-router-dom";
import GlobalAxios from "../../../../../Global/GlobalAxios";

function EditLead() {
  const [rtoLocations, setRtoLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // For data loading
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  let { id } = useParams();
  const [rto_state, setRto_state] = useState([]);
  const [selectedrtostate, setSelectedRtoState] = useState(null);

  const [formData, setFormData] = useState({
    register_number: "",
    rto_location: null,
    register_date: "",
    customer_name: "",
    customer_mobile: "",
    address: "",
    status: null,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        let lead = await EditLeadData(id);
        let leadData = lead.data;
        console.log("Lead Data: ", leadData);
        setSelectedRtoState(leadData.state_id);
        setFormData({
          register_number: leadData.register_number || "",
          rto_location: leadData.rto_location || null,
          register_date: leadData.register_date || "",
          customer_name: leadData.customer_name || "",
          customer_mobile: leadData.customer_mobile || "",
          address: leadData.address || "",
          status: leadData.status || null,
        });

        // Fetch RTO locations for the lead's state
        const response = await GlobalAxios.get(
          `/admin/rtolocations/state/${leadData.state_id}`
        );
        setRtoLocations(response.data.data);
      } catch (error) {
        console.error("Error fetching lead data:", error);
      } finally {
        setLoadingData(false); // Hide loader after data fetch
      }
    };
    fetch();
    console.log("Edit Lead ID: ", id);
  }, [id]);

  useEffect(() => {
    const response = GlobalAxios.get("/admin/state");
    response.then((data) => {
      console.log("State", data.data.states);
      setRto_state(data.data.states);
    });
  }, []);

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

  const handleStateChange = async (e) => {
    const { value } = e.target;
    setSelectedRtoState(value);

    const response = await GlobalAxios.get(
      `/admin/rtolocations/state/${value}`
    );
    console.log(response.data.data);
    setRtoLocations(response.data.data);
    setFormData({
      ...formData,
      rto_location: "", // Reset RTO location when state changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});
    console.log(formData);

    try {
      const response = await GlobalAxios.put(`/admin/leads/${id}`, formData);
      setLoading(false);
      if (response.data.status === "success") {
        toast.success("Lead updated successfully!");
        setTimeout(() => {
          navigate("/admin/leads");
        }, 4000);
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

  return (
    <div className="flex justify-center items-center  bg-gray-100 dark:bg-gray-900 px-4">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100">Edit Lead</h2>
        {loadingData ? (
          <div className="flex justify-center items-center min-h-screen">
            <HashLoader size={50} color={"#4A90E2"} />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter Registration No"
                />
                {validationErrors.register_number && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
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
                  value={selectedrtostate || ""}
                  onChange={handleStateChange}
                  required
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select State</option>
                  {rto_state.map((state) => (
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select RTO Location</option>
                  {rtoLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
                {validationErrors.rto_location && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                />
                {validationErrors.register_date && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter Customer Name"
                />
                {validationErrors.customer_name && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {validationErrors.customer_name}
                  </p>
                )}
              </div>
              <div className="col-span-1 mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Phone No:
                </label>
                <input
                  type="text"
                  name="customer_mobile"
                  value={formData.customer_mobile}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter Phone No"
                />
                {validationErrors.customer_mobile && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {validationErrors.customer_mobile}
                  </p>
                )}
              </div>
              <div className="col-span-1 mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter Address"
                />
                {validationErrors.address && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Status</option>
                  <option value="1">Hot</option>
                  <option value="2">Warm</option>
                  <option value="3">Cold</option>
                </select>
                {validationErrors.status && (
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {validationErrors.status}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="py-3 px-6 text-white bg-gray-900 dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-500 rounded-md focus:outline-none"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#fff"} />
                ) : (
                  "Update Lead"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditLead;