import GlobalAxios from "../../../../Global/GlobalAxios";

const LeadsData = async () => {
  const pageNo = window.page || null;
  const rto_location = window.rto_location || null;
  const rto_year = window.year || null;
  const rto_lead_status = window.status || null;
  const per_page = window.per_page || null;
  const assign_to = window.assign_to || null;
  const situation = window.situation || null;

  console.log("LeadsData", pageNo, rto_location, rto_year, rto_lead_status, per_page, assign_to, situation);

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

  if (per_page) {
    url += `&per_page=${per_page}`;
  }
  if (assign_to) {
    url += `&assigned_to=${assign_to}`;
  }
  if (situation) {
    url += `&assigned_sit=${situation}`;
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
