const router = require("express").Router();
const { AlumniSignup } = require("../controllers/alumniControllers/AlumniAuth");

router.post("/signup", AlumniSignup);
module.exports = router;
