import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    token: Cookies.get("auth_token"),
    role: Cookies.get("role"),
  });

  useEffect(() => {
    const handleTokenChange = () => {
      setAuthState({
        token: Cookies.get("auth_token"),
        role: Cookies.get("role"),
      });
    };

    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  return authState;
};

export default useAuth;
