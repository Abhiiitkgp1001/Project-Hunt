import axios from "axios";
const GetProfile = async (token) => {
  const response = await axios.get("http://localhost:8000/api/profile/user/", {
    headers: {
        'x-auth-token':token
    }
  });
  console.log(response.data);
  console.log(response.status);
  return response.data;
};

export default GetProfile;
