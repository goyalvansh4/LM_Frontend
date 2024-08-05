import GlobalAxios from "../../../../../Global/GlobalAxios";

const FetchData = async () => {
  
  try {
    const response = await GlobalAxios.get(`/admin/rtolocations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default FetchData;
