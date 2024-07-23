import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { injectable } from "tsyringe";

export type Context = {
  prisma: PrismaClient;
};

// create the context
export const context: Context = {
  prisma: new PrismaClient(),
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};
