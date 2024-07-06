import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import GlobalAxios from "../../../../../Global/GlobalAxios";
import BackButton from "../../../../../components/Button/BackButton";

const EditUser = () => {
  const { id } = useParams(); // Assuming the user ID is passed as a route parameter
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // For data loading
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GlobalAxios.get(`/admin/users/${id}`);
        if (response.data.status === "success") {
          // toast.success("User data fetched successfully!");
          //console.log(response.data.data);
          let userData = response.data.data;
          setFormData({
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            status: userData.status,
          });
          setLoadingData(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

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
    setLoading(true);
    // Simulate an API call
    console.log("FormData", formData);
    try {
      const response = await GlobalAxios.put(`/admin/users/${id}`, formData);
      console.log(response.data);
      if (response.data.status === "success") {
        toast.success("User updated successfully!");
        setLoading(false);
      } else if (response.data.status === "error" && response.data.message === "Validation error") {
        setErrors(response.data.errors);
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-5 px-4">
      <ToastContainer />
      <div className="w-full max-w-4xl dark:text-white shadow-lg rounded-lg p-8 transition-transform duration-500 ease-in-out transform hover:-translate-y-1">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Edit User
        </h2>
        {loadingData ? (
          <div className="flex justify-center items-center min-h-screen">
            <ClipLoader size={50} color={"#4A90E2"} />
          </div>
        ) : (
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
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
                  className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="py-3 px-6 text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-lg rounded-lg font-semibold shadow-md flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#FFF"} />
                ) : (
                  "Update User"
                )}
              </button>
              <BackButton url="users" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUser;
