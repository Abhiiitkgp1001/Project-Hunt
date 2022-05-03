import axios from "axios";
const AddPost = async (token, title, role, description, skills) => {
  const response = await axios.post(
    "http://localhost:8000/api/post/",
    {
      title: title,
      needed: role,
      description: description,
      technologyToUse: skills,
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

export default AddPost;
