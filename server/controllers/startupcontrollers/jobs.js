const Job = require("../../models/JobModel");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json({
      message: "Events retrieved successfully",
      success: true,
      jobs: jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong!",
      success: false,
    });
  }
};

const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    res.status(200).json({
      message: "Job retrieved successfully",
      success: true,
      job: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;

  const newJob = new Job({
    title,
    description,
    company,
    location,
    salary,
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json({
      job: savedJob,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
};
