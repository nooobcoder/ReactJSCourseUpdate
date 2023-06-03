import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
