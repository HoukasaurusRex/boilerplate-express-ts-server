import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL ?? '', allowExitOnIdle: true })
export default new PrismaClient({ adapter: new PrismaPg(pool) })
