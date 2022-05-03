import axios from "axios";
const GetCurrentPost = async (token, post_id) => {
  console.log(post_id);
  const response = await axios.get(
    `http://localhost:8000/api/post/${post_id}/`,
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

export default GetCurrentPost;
