import axios from "axios";
const Register = async (name, email, password) => {
  const response = await axios.post("http://localhost:8000/api/users/", {
    name: name,
    email: email,
    password: password,
  });
  console.log(response.data);
  console.log(response.status);
  return response.data;
};

export default Register;
