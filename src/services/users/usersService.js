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
  let [userId, email, firstName, lastName, password] = args;

  // password encrypt..
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  try {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: { email, firstName, lastName, password: hash },
    });

    return updatedUser;
  } catch (error) {
    throw new Error(error.message || "Error updating review");
  }
};

// export module functions..
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  //   deleteUserById,
};
