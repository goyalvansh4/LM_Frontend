import axios from "axios";
import Cookies from "js-cookie"; // Make sure you have this package installed

const GlobalAxios = axios.create({
  baseURL: "http://192.168.28.152:8000/api/v1", // Replace with your base URL
  headers: {
    Accept: "application/json",
  },
});

// Get the token from cookies
let token = Cookies.get("auth_token");

// Add a request interceptor
GlobalAxios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default GlobalAxios;
