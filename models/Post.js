const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  needed: {
    type: [String],
  },
  technologyToUse: {
    type: [String],
  },
  likes: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userSchema",
        },
      },
    ],
  },
  comments: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userSchema",
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PostSchema", PostSchema);
