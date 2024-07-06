import React, { useEffect } from "react";
import GlobalAxios from "../../../../Global/GlobalAxios";

const FetchUserData = async() => {
    try {
      const response = await GlobalAxios.get("/admin/users");
      console.log("User Data:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
};

export default FetchUserData;