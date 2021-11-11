const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bycrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please include a password with at least 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // { email: email }

      // If user already exist
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: "User already exists" }] });
      }

      // Creating avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Creating new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Hash password
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);

      // Add to db
      await user.save();

      res.send("User registered");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
