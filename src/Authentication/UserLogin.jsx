import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GlobalAxios from "../Global/GlobalAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (Cookies.get("auth_token") && Cookies.get("role")) {
       Cookies.remove("auth_token");
       Cookies.remove("role");
    }
 }, []);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await GlobalAxios.post(
        "/user/login", // replace with your API endpoint
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.status === "success") {
        let auth_token = response.data.data.token;
        Cookies.set("auth_token", auth_token, { expires: 1 }); // The cookie will expire in 1 days
        Cookies.set("role", response.data.data.role);

        navigate("/user");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error posting data.");
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full bg-[#fcfcfc] rounded-xl py-4 md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 flex">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="true"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mb-2 block bg-black text-white hover:bg-gray-400 focus:bg-gray-800 font-semibold rounded-lg px-4 py-3 mt-6"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white inline-block"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <NavLink to="/login" className="ml-4">
                LogIn as Admin
              </NavLink>
            </div>
          </button>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
