// import ..
const usersService = require("../../services/users/usersService");

// GET /api/users
const getAllUsers = async (req, res) => {
console.log('************');
console.log('users controller ');

  // dont really need userId in this case.. ??
  const { userId } = req.user;
  console.log('userId', userId);

  
  try {
    const users = await usersService.getAllUsers();
    // need something for no results.. ??
    console.log('users', users);
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/users/:id
const getUserById = async (req, res) => {
  // authenticated user
  const { userId } = req.user;
  // request user
  const { id } = req.params;

  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/users/:id
const updateUserById = async (req, res) => {
  // authenticated user..
  const { userId } = req.user;

  // target user..
  const { id } = req.params;

  // user data to update..
  const { email, firstName, lastName, password } = req.body;

  try {
    const updatedUser = await usersService.updateUserById(
      email,
      firstName,
      lastName,
      password // need to hash..look at register.
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/users/:id
const deleteUserById = async (req, res) => {
  // authenticated user..
  const { userId } = req.user;
  // target user..
  const { id } = req.params;

  try {
    // delete
    const deletedUser = await usersService.deleteUserId(id);

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
