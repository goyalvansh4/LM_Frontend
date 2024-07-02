import React, { useEffect, useState } from "react";
import FetchData from "./FetchData";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "../main.css";

function AddLead({ setModalOpen }) {
  const [rtoLocations, setRtoLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    FetchData().then((data) => {
      setRtoLocations(data.data);
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
    console.log(formData);

    let token = Cookies.get("auth_token");

    try {
      const response = await axios.post(
        `http://192.168.169.246:8000/api/v1/admin/leads`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
          setModalOpen(false);
        }, 2000);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          Add New Lead
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Registration No:
              </label>
              <input
                type="text"
                name="register_number"
                value={formData.register_number}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Registration No"
              />
              {validationErrors.register_number && (
                <p className="text-red-600 text-sm">
                  {validationErrors.register_number}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                RTO Location:
              </label>
              <select
                name="rto_location"
                value={formData.rto_location || ""}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
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
              <label className="block text-gray-700 font-medium mb-2">
                Registration Date:
              </label>
              <input
                type="date"
                name="register_date"
                value={formData.register_date}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
              {validationErrors.register_date && (
                <p className="text-red-600 text-sm">
                  {validationErrors.register_date}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Customer Name:
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Customer Name"
              />
              {validationErrors.customer_name && (
                <p className="text-red-600 text-sm">
                  {validationErrors.customer_name}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Phone No:
              </label>
              <input
                type="text"
                name="customer_mobile"
                value={formData.customer_mobile}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Phone No"
              />
              {validationErrors.customer_mobile && (
                <p className="text-red-600 text-sm">
                  {validationErrors.customer_mobile}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter Address"
              />
              {validationErrors.address && (
                <p className="text-red-600 text-sm">
                  {validationErrors.address}
                </p>
              )}
            </div>
            <div className="col-span-1 mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Status:
              </label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="1">Hot</option>
                <option value="2">Warm</option>
                <option value="3">Cold</option>
              </select>
              {validationErrors.status && (
                <p className="text-red-600 text-sm">
                  {validationErrors.status}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="py-3 px-6 text-white bg-gray-900 hover:bg-gray-800 text-lg rounded-lg font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#FFF"} /> : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLead;
