const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth/authController");
const { protect } = require("../../middleware/authMiddleware");

// GET /api/users
router.get("/", protect, usersController.getUsers);

// GET /api/users/:id
router.post("/:userId", usersController.getUser);

// PUT /api/users/:userId
router.put("/:userId", protect, usersController.updateUser);

// DELETE /api/users/:userId
router.delete("/:userId", protect, usersController.deleteUser);

module.exports = router;