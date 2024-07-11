import axios from "axios";
import Cookies from "js-cookie"; // Make sure you have this package installed
const apiUrl = import.meta.env.VITE_API_URL;

const GlobalAxios = axios.create({
  baseURL: apiUrl,
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
