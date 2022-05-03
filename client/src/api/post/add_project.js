import axios from "axios";
const AddProject = async (token, title, role, description, skills) => {
  const response = await axios.put(
    "http://localhost:8000/api/profile/projects/",
    {
      title: title,
      role: role,
      description: description,
      technologiesUsed: skills,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  console.log(response.data);
  console.log(response.status);
  return response.data;
};

export default AddProject;
