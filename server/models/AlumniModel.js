const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  startYear: {
    type: Number,
  },
  endYear: {
    type: Number,
  },
});

const alumniSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  graduationYear: {
    type: Number,
  },
  degree: {
    type: String,
    trim: true,
  },
  major: {
    type: String,
    trim: true,
  },
  currentJobTitle: {
    type: String,
    trim: true,
  },
  currentCompany: {
    type: String,
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
  },
  location: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  resume: {
    type: String,
    default: null,
  },
  previousExperience: [experienceSchema],
});

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;
