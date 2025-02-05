const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/usersController");
const { protect } = require("../../middleware/authMiddleware");

// GET /api/users
router.get("/", protect, usersController.getAllUsers);

// GET /api/users/:id
router.post("/:id", protect, usersController.getUserById);

// PUT /api/users/:userId
router.put("/:id", protect, usersController.updateUserById);

// DELETE /api/users/:userId
router.delete("/:id", protect, usersController.deleteUserById);

module.exports = router;
