const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../models/User");
const bcryt = require("bcryptjs");
const config = require("config");
const jwtTokenKey = config.get("jwtTokenKey");
const jwt = require("jsonwebtoken");
// @route POST api/users
// @access Public
// @desc Resgister User
router.post(
  "/",
  [
    check("name", "Name is empty").notEmpty(),
    check("email", "Invalid Email").isEmail(),
    check("password", "Character Insufficient : Min 6").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { name: name, email: email, password: password } = req.body;

    try {
      //Check if user already exists
      let user = await User.findOne({ email: email });
      if (user != null) {
        return res.status(251).json({ error: "User already exists" });
      }
      const avatar = gravatar.url(email, {
        s: "400",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });

      const salt = await bcryt.genSalt(10);
      user.password = await bcryt.hash(user.password, salt);
      console.log(user.password);
      await user.save();

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
