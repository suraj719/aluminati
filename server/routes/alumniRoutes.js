const router = require("express").Router();
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
router.put("/update", alumniMiddleware, updateAlumni);

router.get("/events", alumniMiddleware, getEvents);
router.post("/create-event", alumniMiddleware, createEvent);
router.get("/event/:id", alumniMiddleware, getEventById);

module.exports = router;
