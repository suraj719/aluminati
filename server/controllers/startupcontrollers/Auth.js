const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Startup = require("../../models/StartupModel");
const uploadToS3 = require("../../util/AWSUpload");

const StartupSignup = async (req, res) => {
  try {
    const userExists = await Startup.findOne({
      email: req.body.email,
    });
    if (userExists) {
      return res.status(200).json({
        message: "Startup already exists with this email",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newStartup = new Startup(req.body);
    await newStartup.save();

    const token = jwt.sign(
      { startupID: newStartup._id },
      process.env.jwt_secret,
      {
        expiresIn: "1h",
      }
    );
    newStartup.password = null;
    res.status(200).json({
      message: "Account created successfully",
      user: newStartup,
      data: token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const StartupLogin = async (req, res) => {
  try {
    const startup = await Startup.findOne({
      email: req.body.email,
    });
    if (!startup) {
      return res.status(200).json({
        message: "No user found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, startup.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ startupID: startup._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });

    startup.password = null;
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: token,
      user: startup,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ _id: req.body.startupID });
    if (!startup) {
      return res.status(200).json({
        message: "Startup not found",
        success: false,
      });
    }
    startup.password = undefined;
    res.status(200).json({
      message: "Startup found",
      success: true,
      user: startup,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({ _id: req.startupID });
    if (!startup) {
      return res.status(404).json({
        message: "Startup not found",
        success: false,
      });
    }

    const updateFields = {
      ...req.body,
      founders: JSON.parse(req.body.founders || "[]"),
      team: JSON.parse(req.body.team || "[]"),
      socialMedia: JSON.parse(req.body.socialMedia || "{}"),
    };

    const logo = req.file;
    if (logo) {
      const logoUrl = await uploadToS3(logo);
      updateFields.logo = logoUrl;
    }

    Object.keys(updateFields).forEach((key) => {
      if (
        updateFields[key] === "" ||
        updateFields[key] === null ||
        updateFields[key] === undefined
      ) {
        delete updateFields[key];
      }
    });

    Object.assign(startup, updateFields);
    await startup.save();

    res.status(200).json({
      message: "Startup updated successfully",
      success: true,
      data: startup,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findOne({ _id: req.params.id });
    if (!startup) {
      return res.status(200).json({
        message: "Startup not found",
        success: false,
      });
    }
    startup.password = undefined;
    res.status(200).json({
      message: "Startup found",
      success: true,
      user: startup,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllStartup = async (req, res) => {
  try {
    const startups = await Startup.find({}, { password: 0 });
    res.status(200).json({
      message: "All startups retrieved successfully",
      success: true,
      data: startups,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  StartupSignup,
  StartupLogin,
  getStartup,
  updateStartup,
  getStartupById,
  getAllStartup,
};
