const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  AlumniSignup,
  AlumniLogin,
  getAlumni,
  updateAlumni,
  getAlumniById,
  getAllAlumni,
  changePassword,
  deleteAccount,
} = require("../controllers/alumniControllers/Auth");
const {
  getEvents,
  createEvent,
  getEventById,
  registerForEvent,
} = require("../controllers/alumniControllers/Events");
const alumniMiddleware = require("../middlewares/alumniMiddleware");
const {
  getPosts,
  createPost,
} = require("../controllers/alumniControllers/Posts");

router.post("/signup", AlumniSignup);
router.post("/login", AlumniLogin);
router.post("/get-alumni", alumniMiddleware, getAlumni);
router.get("/get-alumni/:id", alumniMiddleware, getAlumniById);
router.post(
  "/update-alumni",
  alumniMiddleware,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateAlumni
);
router.get("/get-all-alumni", alumniMiddleware, getAllAlumni);
router.post("/change-password", alumniMiddleware, changePassword);
router.delete("/delete-account", alumniMiddleware, deleteAccount);

router.get("/events", alumniMiddleware, getEvents);
router.post(
  "/create-event",
  alumniMiddleware,
  upload.single("image"),
  createEvent
);
router.get("/event/:id", alumniMiddleware, getEventById);
router.post("/event/register", alumniMiddleware, registerForEvent);

router.get("/posts", alumniMiddleware, getPosts);
router.post(
  "/create-post",
  alumniMiddleware,
  upload.single("image"),
  createPost
);

module.exports = router;
