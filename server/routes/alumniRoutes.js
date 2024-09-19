const router = require("express").Router();
const {
  AlumniSignup,
  AlumniLogin,
  getAlumni,
  updateAlumni,
} = require("../controllers/alumniControllers/AlumniAuth");
const alumniMiddleware = require("../middlewares/alumniMiddleware");

router.post("/signup", AlumniSignup);
router.post("/login", AlumniLogin);
router.post("/get-alumni", alumniMiddleware, getAlumni);
router.put("/update", alumniMiddleware, updateAlumni);
module.exports = router;
