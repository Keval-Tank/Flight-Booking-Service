import 'dotenv/config'
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const connectionUrl = process.env.DATABASE_URL
const adapter = new PrismaPg({connectionUrl})
const prisma = new PrismaClient({adapter})

export default prisma