import GlobalAxios from "../../../../Global/GlobalAxios";

const FetchUserData = async() => {
    try {
      const response = await GlobalAxios.get("/admin/users");
      return response.data;
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.log("Error:", error);
    }

};

export default FetchUserData;
