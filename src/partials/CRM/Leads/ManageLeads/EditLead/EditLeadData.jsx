import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EditLeadData = async (id) => {
  let token = Cookies.get("auth_token");

  let url = `http://192.168.169.246:8000/api/v1/admin/leads/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default EditLeadData;
