const {
  StartupSignup,
  StartupLogin,
  getStartup,
  updateStartup,
} = require("../controllers/startupcontrollers/Auth");
const {
  getJobs,
  createJob,
  getJobById,
} = require("../controllers/startupcontrollers/jobs");
const alumniMiddleware = require("../middlewares/alumniMiddleware");
const startupMiddleware = require("../middlewares/startupMiddleware");

const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", StartupSignup);
router.post("/login", StartupLogin);
router.post("/get-startup", startupMiddleware, getStartup);
router.post(
  "/update-startup",
  startupMiddleware,
  upload.single("logo"),
  updateStartup
);

router.get("/jobs", alumniMiddleware, getJobs);
router.post("/create-job", createJob);
router.get("/job/:id", alumniMiddleware, getJobById);

module.exports = router;
