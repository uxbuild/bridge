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
      return res.status(404).json({ message: "User not found" });
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
      id,
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
const deleteUserById = async (req, res, next) => {
console.log('**************');
console.log('user service delete', req.user);

  // target user..
  const { id } = req.params;  
  // current user..
  const userId = req.user.userId;
console.log(`target user:${id}, current user: ${userId}`);

  try {
    
    // check not deleting our own account..
    if (id === userId) {
      return res.status(403).send({ message: 'You cannot delete your own account.' });
    }

    // delete user..
    const deletedUser = await usersService.deleteUserById(id);

    if (deletedUser) {
      return res.status(200).send({
        message: 'User deleted successfully',
        deletedUser,  // Include the deleted user information in the response
      });
    }

    res.status(404).send({ message: 'User not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
