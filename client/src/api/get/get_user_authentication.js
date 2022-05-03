import axios from "axios";
const GetUserAuthentication = async (token) => {
  const response = await axios.get("http://localhost:8000/api/auth/", {
    headers: {
      "x-auth-token": token,
    },
  });
  console.log(response.data);
  console.log(response.status);
  return response.data;
};

export default GetUserAuthentication;
