import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import GlobalAxios from "../../../../../Global/GlobalAxios";
import { Navigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active",
    mobile: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = Navigate;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null, // Clear the error when the user starts typing
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrors({
        ...errors,
        password_confirmation: "Passwords do not match!",
      });
      return;
    }
    setLoading(true);
    // Simulate an API call
    console.log(formData);
    try {
      const response = await GlobalAxios.post("/admin/users", formData);
      console.log(response.data);
      if (response.data.status === "success") {
        toast.success("User added successfully!");
        setFormData({
          name: "",
          email: "",
          status: "active",
          mobile: "",
          password: "",
          password_confirmation: "",
        });
        setErrors({});
      } else if (response.data.status === "error" && response.data.errors) {
        setErrors(response.data.errors);
      }
      setLoading(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 px-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 transition-transform duration-500 ease-in-out transform hover:-translate-y-1">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Add New User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Phone No:
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter Phone No"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Status:
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Confirm Password:
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Confirm Password"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-3 px-6 text-white bg-blue-600 hover:bg-blue-500 text-lg rounded-lg font-semibold shadow-md flex items-center dark:bg-blue-500 dark:hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color={"#FFF"} /> : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
