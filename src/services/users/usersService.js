// imports..
const prisma = require("../../../prisma/prismaClient");

// Get all items..
const getAllUsers = async () => {

    console.log('**************');
    console.log('users service');

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
    console.log('users', users);
    
    return users;
  } catch (error) {
    throw new Error("Error retrieving ALL items.");
  }
};

// export module functions..
module.exports = {
  getAllUsers,
  //   getUserById,
  //   updateUserById,
  //   deleteUserById,
};
