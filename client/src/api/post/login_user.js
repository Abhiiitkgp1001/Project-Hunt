import axios from "axios";
const Login = async (email, password) => {
  const response = await axios.post("http://localhost:8000/api/auth/login/", {
    email: email,
    password: password,
  });
  console.log(response.data);
  console.log(response.status);
  return response.data;
};

export default Login;
