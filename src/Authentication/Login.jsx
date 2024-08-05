import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GlobalAxios from "../Global/GlobalAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    navigate("/admin");
    // try {
    //   const response = await GlobalAxios.post("/admin/login", {
    //     email: formData.email,
    //     password: formData.password,
    //   });

    //   if (response.data.status === "success") {
    //     let auth_token = response.data.data.token;
    //     Cookies.set("auth_token", auth_token, { expires: 1 });
    //     Cookies.set("role", response.data.data.role);
    //     //toast.success("Login successful!", { autoClose: 2000 });
    //     
    //   } else {
    //     toast.error(response.data.message, { autoClose: 1000 });
    //   }
    // } catch (error) {
    //   console.error("Error posting data:", error);
    //   toast.error("An error occurred. Please try again.", { autoClose: 1000 });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full bg-[#fcfcfc] rounded-xl py-4 md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 px-6 lg:px-16 xl:px-12 flex ">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Login as Admin
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
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full mb-2 block bg-black text-white hover:bg-gray-400 focus:bg-gray-800 font-semibold rounded-lg px-4 py-3 mt-6 transition-all duration-300 ease-in-out ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
