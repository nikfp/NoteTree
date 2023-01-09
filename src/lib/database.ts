import { PrismaClient } from "@prisma/client"
export type { Note, User } from "@prisma/client"

export const prisma = new PrismaClient();


