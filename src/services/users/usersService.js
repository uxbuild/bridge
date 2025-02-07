// imports..
const bcrypt = require("bcryptjs");
const prisma = require("../../../prisma/prismaClient");

// Get all items..
const getAllUsers = async () => {
  console.log("**************");
  console.log("users service");

  try {
    // get users..
    const users = await prisma.users.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    // do a check for no results.. ??

    // return users..
    console.log("users", users);

    return users;
  } catch (error) {
    throw new Error("Error retrieving ALL items.");
  }
};

// GET /api/users/:id
const getUserById = async (userId) => {
  try {
    return await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });
  } catch (error) {
    throw new Error(error.message || "Error fetching review by ID");
  }
};

// PUT /api/users/:id
const updateUserById = async (...args) => {
  console.log("************");
  console.log("users service update", args);
  let [id, email, firstName, lastName, password] = args;

  // password encrypt..
  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  const { validate } = require("uuid");

  console.log("id: ", id);

  // check userId is uuid..
  if (!validate(id)) {
    throw new Error("Invalid userId format");
  }
  console.log("valid uuid userId", id);

  try {
    const updatedUser = await prisma.users.update({
      where: { id: id },
      data: { email, firstName, lastName, password },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Error updating review");
  }
};

const deleteUserById = async (userId) => {
  console.log('*************');
  console.log('user service delete userId:', userId);
  
  try {
    // Delete the user by userId
    const deletedUser = await prisma.users.delete({
      where: { id: userId },
    });

    // Return the deleted user record if it exists
    return deletedUser || null;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

// export module functions..
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
