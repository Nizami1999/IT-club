const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route   GET api/profile/me
// @desc    Get logged in profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send("Server error");
  }
  res.send("Profile route");
});

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/:user_id
// @desc    Get profile by id
// @access  Public
router.get("/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({
        message: "Profile not found",
      });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "Profile not found",
      });
    }
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile/
// @desc    Create or Update a user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) {
      profileFields.company = company;
    }
    if (website) {
      profileFields.website = website;
    }
    if (location) {
      profileFields.location = location;
    }
    if (bio) {
      profileFields.bio = bio;
    }
    if (status) {
      profileFields.status = status;
    }
    if (githubusername) {
      profileFields.githubusername = githubusername;
    }
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) {
      profileFields.social.youtube = youtube;
    }
    if (facebook) {
      profileFields.social.facebook = facebook;
    }
    if (twitter) {
      profileFields.social.twitter = twitter;
    }
    if (instagram) {
      profileFields.social.instagram = instagram;
    }
    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // If profile exists
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();

      return res.json(profile);
    } catch (err) {
      res.status(500).send("Server error");
    }

    console.log(profileFields.skills);

    res.send("Success");
  }
);

// @route   DELETE api/profile/:user_id
// @desc    Delete all profiles
// @access  Public
router.delete("/", auth, async (req, res) => {
  try {
    // @todo - remove users posts

    // Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
