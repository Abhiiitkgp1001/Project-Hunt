import axios from "axios";
const SaveProfile = async (
  token,
  bio,
  gender,
  mobileNo,
  college,
  course,
  branch,
  year,
  skills,
  facebook,
  instagram,
  linkedIn,
  github
) => {
  const response = await axios.post(
    "http://localhost:8000/api/profile/createOrUpdate/",
    {
      skills: skills,
      bio: bio,
      gender: gender,
      mobileNo: mobileNo,
      college: college,
      course: course,
      year: year,
      branch: branch,
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedIn,
      github: github,
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

export default SaveProfile;
