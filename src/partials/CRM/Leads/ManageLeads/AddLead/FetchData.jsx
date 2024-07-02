import axios from "axios";
import Cookies from "js-cookie";

const FetchData = async () => {
  let token = Cookies.get("auth_token");
  try {
    const response = await axios.get(
      `http://192.168.169.246:8000/api/v1/admin/rtolocations`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export default FetchData;
