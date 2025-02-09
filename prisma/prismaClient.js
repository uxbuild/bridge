// debug..
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Loaded" : "MISSING");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Export the Prisma client instance to be reused throughout the app
module.exports = prisma;