import GlobalAxios from "../../../../../Global/GlobalAxios";

const EditLeadData = async (id) => {
  let url = `/admin/leads/${id}`;
  try {
    const response = await GlobalAxios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default EditLeadData;
