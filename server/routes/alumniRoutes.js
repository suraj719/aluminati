const router = require("express").Router();
const { AlumniSignup, AlumniLogin, getAlumni } = require("../controllers/alumniControllers/AlumniAuth");
const alumniMiddleware = require("../middlewares/alumniMiddleware");

router.post("/signup", AlumniSignup);
router.post("/login",AlumniLogin)
router.post("/get-alumni",alumniMiddleware,getAlumni)
module.exports = router;
