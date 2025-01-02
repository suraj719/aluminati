const {
  getJobs,
  createJob,
  getJobById,
} = require("../controllers/startupcontrollers/jobs");
const alumniMiddleware = require("../middlewares/alumniMiddleware");

const router = require("express").Router();

router.get("/jobs", alumniMiddleware, getJobs);
router.post("/create-job", createJob);
router.get("/job/:id", alumniMiddleware, getJobById);

module.exports = router;
