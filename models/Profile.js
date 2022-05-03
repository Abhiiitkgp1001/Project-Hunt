const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  gender: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },
  college: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  course: {
    type: String,
  },
  year: {
    type: Number,
  },
  branch: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  projects: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        technologiesUsed: {
          type: [String],
          required: true,
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profileSchema", ProfileSchema);
