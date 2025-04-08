const {
  getEvents,
  getEventById,
  createEvent,
} = require("../controllers/alumniControllers/Events");
const {
  createNews,
  getNews,
} = require("../controllers/collegeControllers/controller");
const alumniMiddleware = require("../middlewares/alumniMiddleware");
const collegeMiddleware = require("../middlewares/collegeMiddleware");

const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/news", alumniMiddleware, getNews);
router.post("/create-news", collegeMiddleware, createNews);
router.get("/events", collegeMiddleware, getEvents);
router.get("/event/:id", collegeMiddleware, getEventById);
router.post(
  "/create-event",
  collegeMiddleware,
  upload.single("image"),
  createEvent
);

module.exports = router;
