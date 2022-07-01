import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

const createContext = (opts?: CreateNextContextOptions) => {
  return { prisma: new PrismaClient() };
};

export { createContext };
export type Context = inferAsyncReturnType<typeof createContext>;
