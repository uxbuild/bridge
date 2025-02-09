const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const { protect } = require("../../middleware/authMiddleware");


// POST /api/auth/register
router.post("/register", authController.registerUser);

// POST /api/auth/login
router.post("/login", authController.loginUser);

// GET /api/auth/me
router.get("/me", protect, authController.getMe);

router.get("/test-auth", (req, res) => {
    res.json({ message: "Auth test route works!" });
  });

//debug.. 
console.log('****************');
console.log("Auth Routes Registered:");
router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(` - ${Object.keys(layer.route.methods)} ${layer.route.path}`);
  }
});

module.exports = router;