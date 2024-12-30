const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Alumni = require("../../models/AlumniModel");

const AlumniSignup = async (req, res) => {
  try {
    const userExists = await Alumni.findOne({
      email: req.body.email,
    });
    if (userExists) {
      return res.status(200).json({
        message: "user already exists with this email",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const nameParts = req.body.name.split(" ");
    req.body.firstName = nameParts[0];
    req.body.lastName =
      nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    const token = jwt.sign({ alumniID: newAlumni._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });
    newAlumni.password = null;
    res.status(200).json({
      message: "Account created successfully",
      user: newAlumni,
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

const AlumniLogin = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({
      email: req.body.email,
    });
    if (!alumni) {
      return res.status(200).json({
        message: "No user found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, alumni.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Invalid password",
        success: false,
      });
    }
    // if (alumni.isApproved === false) {
    //   return res.status(200).json({
    //     message: "Your account is not approved yet",
    //     success: false,
    //   });
    // }
    const token = jwt.sign({ alumniID: alumni._id }, process.env.jwt_secret, {
      expiresIn: "1h",
    });
    alumni.password = null;
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: token,
      user: alumni,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findOne({
      _id: req.body.alumniID,
    });
    if (!alumni) {
      return res.status(200).json({
        message: "Alumni not found",
        success: false,
      });
    }
    alumni.password = undefined;
    res.status(200).json({
      message: "Alumni found",
      success: true,
      user: alumni,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateAlumni = async (req, res) => {
  try {
    const { alumniID, ...updateFields } = req.body;
    const alumni = await Alumni.findById(alumniID);

    if (!alumni) {
      return res.status(404).json({
        message: "Alumni not found",
        success: false,
      });
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
    Object.assign(alumni, updateFields);
    await alumni.save();

    res.status(200).json({
      message: "Alumni updated successfully",
      success: true,
      data: alumni,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  AlumniSignup,
  AlumniLogin,
  getAlumni,
  updateAlumni,
};
