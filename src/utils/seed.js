// import
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

// prima client
const prisma = new PrismaClient();

// dev environ only.
if (process.env.NODE_ENV !== "development") {
  process.exit(0); // exit
}

async function main() {
  // start
  console.log("Seeding database..");
  //drop table
  await prisma.$transaction([prisma.users.deleteMany()]);

  // create users
  const users = [];
  for (let i = 0; i < 3; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    // const password = faker.internet.password();
    const password = "password"; // For testing purposes..
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
