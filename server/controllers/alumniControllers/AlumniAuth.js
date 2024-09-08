const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Alumni = require("../../models/AlumniModel");

const AlumniSignup = async (req, res) => {
  try {
    const userExists = await Alumni.findOne({
      email: req.body.email,
    });
    if (userExists) {
      return res.status(200).send({
        message: "user already exists with this email",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newAlumni = new Alumni(req.body);
    await newAlumni.save();
    res.status(200).send({
      message: "Account created successfully and sent for verification!",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      succes: false,
    });
  }
};

module.exports = {
  AlumniSignup,
};
