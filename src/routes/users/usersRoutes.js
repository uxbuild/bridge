const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const { protect } = require("../../middleware/authMiddleware");

// GET /api/users
router.get("/", protect, usersController.getAllUsers);

// GET /api/users/:id
router.post("/:userId", protect, usersController.getUserById);

// PUT /api/users/:userId
router.put("/:userId", protect, usersController.updateUser);

// DELETE /api/users/:userId
router.delete("/:userId", protect, usersController.deleteUser);

module.exports = router;