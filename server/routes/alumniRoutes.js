const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  AlumniSignup,
  AlumniLogin,
  getAlumni,
  updateAlumni,
} = require("../controllers/alumniControllers/AlumniAuth");
const {
  getEvents,
  createEvent,
  getEventById,
} = require("../controllers/alumniControllers/Events");
const alumniMiddleware = require("../middlewares/alumniMiddleware");

router.post("/signup", AlumniSignup);
router.post("/login", AlumniLogin);
router.post("/get-alumni", alumniMiddleware, getAlumni);
router.post(
  "/update",
  alumniMiddleware,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateAlumni
);

router.get("/events", alumniMiddleware, getEvents);
router.post(
  "/create-event",
  alumniMiddleware,
  upload.single("image"),
  createEvent
);
router.get("/event/:id", alumniMiddleware, getEventById);

module.exports = router;
