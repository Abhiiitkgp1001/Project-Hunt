const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// @route GET api/profile/user
// @access Public
// @desc Get User profile data
router.get("/user", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "-password"
    );
    if (!profile) {
      return res.status(251).json({ error: "No profile found" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route POST api/profile/createOrUpdate
// @access Private
// @desc Create or Update user profile
router.post("/createOrUpdate", auth, async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const {
    skills,
    bio,
    course,
    year,
    college,
    mobileNo,
    gender,
    branch,
    facebook,
    instagram,
    linkedin,
    github,
  } = req.body;
  const profileDetails = {};
  profileDetails.user = req.user.id;
  if (bio) {
    profileDetails.bio = bio;
  }
  if (college) {
    profileDetails.college = college;
  }
  if (mobileNo) {
    profileDetails.mobileNo = mobileNo;
  }
  if (gender) {
    profileDetails.gender = gender;
  }
  if (course) {
    profileDetails.course = course;
  }
  if (year) {
    profileDetails.year = year;
  }
  if (branch) {
    profileDetails.branch = branch;
  }
  profileDetails.social = {};
  if (facebook) {
    profileDetails.social.facebook = facebook;
  }
  if (instagram) {
    profileDetails.social.instagram = instagram;
  }
  if (linkedin) {
    profileDetails.social.linkedin = linkedin;
  }
  if (github) {
    profileDetails.social.github = github;
  }
  if (skills) {
    profileDetails.skills = skills;
  }
  console.log(profileDetails.skills);

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    //Update a profile
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileDetails },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    console.log(profileDetails);
    console.log(profile);
    //Create a profile
    profile = new Profile(profileDetails);
    console.log(profile);
    await profile.save();
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route GET api/profile/allProfiles
// @access Public
// @desc Get All User profile data
router.get("/allProfiles", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", "-password");
    if (!profile) {
      return res.status(400).json({ error: "No profile found" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route GET api/profile/userId/:user_id
// @access Public
// @desc Get All User profile data
router.get("/userId/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", "-password");
    if (!profile) {
      return res.status(251).json({ error: "No profile found" });
    }
    return res.status(200).json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(251).json({ error: "No profile found" });
    }
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route GET api/profile/deleteProfile
// @access Public
// @desc Get All User profile data
router.delete("/deleteProfile", auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    return res.status(200).json({ error: "Profile deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route PUT api/profile/projects
// @access Private
// @desc Add projects
router.put(
  "/projects",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("description", "Description is required").notEmpty(),
      check("role", "Role is required").notEmpty(),
      check("technologiesUsed", "Used Technologies are required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    const { title, description, role, technologiesUsed } = req.body;
    const project = {
      title,
      description,
      role,
      technologiesUsed,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(251).json({ error: "No profile found" });
      }
      profile.projects.unshift(project);
      await profile.save();
      return res.status(200).json(profile);
    } catch (err) {
      return res.status(500).json({ error: "Server Error" });
    }
  }
);
// @route DELETE api/profile/projects/delete/:project_id
// @access Private
// @desc Add projects
router.delete("/projects/delete/:project_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const projects = profile.projects;
    projects.remove({ _id: req.params.project_id });
    profile.projects = projects;
    await profile.save();
    return res.status(400).json(profile);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
