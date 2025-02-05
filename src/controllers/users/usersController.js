// GET /api/users
// router.get("/", protect, usersController.getUsers);

// GET /api/users/:id
// router.post("/:userId", usersController.getUser);

// PUT /api/users/:userId
// router.put("/:userId", protect, usersController.updateUser);

// DELETE /api/users/:userId
// router.delete("/:userId", protect, usersController.deleteUser);

const usersService = require("../../services/users/usersService");

// samples.. GET all, GET+id, PUT-update, DELETE
// Controller for getting all reviews for an item

// PROTECTED
const getAllUsers = async (req, res) => {
  // dont really need userId in this case.. ??
  const { userId } = req.user;
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  // authenticated user
  const { userId } = req.user;
  // request user
  const { targetUserId } = req.params;

  try {
    const user = await usersService.getUserById(targetUserId);
    if (!user) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller for getting a single review by ID
const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await reviewService.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for updating a review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { text, rating } = req.body;

  try {
    const updatedReview = await reviewService.updateReview(
      reviewId,
      text,
      rating
    );

    // update average rating
    await reviewService.updateAvgRating(itemId);

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    // delete
    const deletedReview = await reviewService.deleteReview(reviewId);

    // update average rating
    await reviewService.updateAvgRating(itemId);

    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByItem,
  getReviewById,
  updateReview,
  deleteReview,
};
