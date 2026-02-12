require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter
});

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const createUser = async (email, password) => {
  return prisma.user.create({
    data: { email, password }
  });
};

module.exports = {
  prisma, 
  findUserByEmail,
  createUser
};
