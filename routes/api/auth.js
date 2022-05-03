const express = require("express");
const router = express.Router();
const protection = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcryt = require("bcryptjs");
const config = require("config");
const jwtTokenKey = config.get("jwtTokenKey");
const jwt = require("jsonwebtoken");
// @route GET api/auth
// @access Public
// @desc Check Authentication of User
router.get("/", protection, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

// @route POST api/auth
// @access Public
// @desc Login User
router.post(
  "/login",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Character Insufficient : Min 6").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email: email, password: password } = req.body;

    try {
      //Check if user is present in the database
      let user = await User.findOne({ email: email });
      if (user == null) {
        return res.status(251).json({ error: "Invalid credentials" });
      }

      const checkPassword = await bcryt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(251).json({ error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, jwtTokenKey, { expiresIn: "10h" }, (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token: token,
        });
      });
    } catch (eor) {
      console.log(eor.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
