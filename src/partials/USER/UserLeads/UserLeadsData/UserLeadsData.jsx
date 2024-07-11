import GlobalAxios from "../../../../Global/GlobalAxios";

const UserLeadsData = async () => {
  const pageNo = window.page || null;
  const rto_location = window.rto_location || null;
  const rto_year = window.year || null;
  const rto_lead_status = window.status || null;
  const per_page = window.per_page || null;

  let url = `/user/leads?page=${pageNo}`;

  if (rto_location) {
    url += `&rto_location=${rto_location}`;
  }

  if (rto_year) {
    url += `&register_date_year=${rto_year}`;
  }

  if (rto_lead_status) {
    url += `&status=${rto_lead_status}`;
  }

  if (per_page) {
    url += `&per_page=${per_page}`;
  }

  try {
    const response = await GlobalAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default UserLeadsData;
