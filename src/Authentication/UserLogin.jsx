import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import GlobalAxios from "../Global/GlobalAxios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alertBox, setAlertBox] = useState({
    visible: false,
    message: "",
  });
  console.log(Cookies.get("auth_token"));
  console.log(Cookies.get("role"));
  const handleChange = (e) => {
    setAlertBox({ visible: false });

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await GlobalAxios.post(
        "/user/login", // replace with your API endpoint
        {
          email: formData.email,
          password: formData.password,
        },
      );

      console.log(response.data)
      if (response.data.status === "success") {
        let auth_token = response.data.data.token;
         
        
        Cookies.set("auth_token", auth_token, { expires: 1 }); // The cookie will expire in 1 days
        Cookies.set("role", (response.data.data.role));
        console.log("Set",Cookies.get("auth_token"));
        console.log("Set",Cookies.get("role"));

        navigate("/user");
      } else {
        setAlertBox({ visible: true, message: response.data.message });
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }

    // navigate("/admin");
    // console.log("form submitted");
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full bg-[#fcfcfc] rounded-xl py-4  md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3  px-6 lg:px-16 xl:px-12 flex ">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          {alertBox.visible && (
            <div className="bg-red-500 text-white p-3 rounded-md mt-4">
              {alertBox.message}
            </div>
          )}

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

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mb-2 block bg-black text-white hover:bg-gray-400 focus:bg-gray-800 font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <NavLink to="/login" className="ml-4">LogIn as Admin</NavLink>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
