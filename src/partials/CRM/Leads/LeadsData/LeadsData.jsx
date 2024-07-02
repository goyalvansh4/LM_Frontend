import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LeadsData = async (pageNo, rto_location, rto_year, rto_lead_status) => {
  let token = Cookies.get("auth_token");

  let url = `http://192.168.169.246:8000/api/v1/admin/leads?page=${pageNo}`;

  if (rto_location) {
    url += `&rto_location=${rto_location}`;
  }

  if (rto_year) {
    url += `&register_date_year=${rto_year}`;
  }

  if (rto_lead_status) {
    url += `&status=${rto_lead_status}`;
  }

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

export default LeadsData;
