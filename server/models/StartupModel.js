const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema({
  name: String,
  passoutYear: Number,
});

const teamMemberSchema = new mongoose.Schema({
  name: String,
  position: String,
});

const startupSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  onboardingStatus: {
    type: Boolean,
    default: false,
  },
  companyName: { type: String, required: true },
  logo: String,
  description: String,
  founders: [founderSchema],
  team: [teamMemberSchema],
  location: String,
  socialMedia: {
    website: String,
    linkedIn: String,
    twitter: String,
  },
});
const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
