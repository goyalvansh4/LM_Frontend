import GlobalAxios from "../../../../Global/GlobalAxios";

const LeadsData = async (pageNo, rto_location, rto_year, rto_lead_status) => {

  let url = `/admin/leads?page=${pageNo}`;

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
    const response = await GlobalAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default LeadsData;
