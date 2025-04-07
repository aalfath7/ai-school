const router = require("express").Router();
const auth = require("../middleware/auth");
const { register, login, me } = require("../controllers/auth.controller");

// Admin only: Create new user
router.post("/register", auth(["admin"]), register);

// Public login route
router.post("/login", login);

// Authenticated route to get user info
router.get("/me", me);

module.exports = router;
