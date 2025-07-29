import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

const seedAdmin = async () => {
  const existing = await prisma.user.findUnique({
    where: { email: 'shougi@admin.com' },
  });

  if (existing) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = bcrypt.hashSync('nexttriporaaa', 10);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'shougi@admin.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user seeded');
};

seedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
