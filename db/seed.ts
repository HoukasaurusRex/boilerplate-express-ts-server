import { create } from '../src/models/Users.ts'
import prisma from '../src/db.ts'

const users = [
  { email: 'alice@example.com', password: 'Password1', firstName: 'Alice', lastName: 'Smith' },
  { email: 'bob@example.com', password: 'Password1', firstName: 'Bob', lastName: 'Jones' },
]

for (const user of users) {
  await create(user).catch(() => console.log(`Skipping ${user.email} — already exists`))
  console.log(`Seeded ${user.email}`)
}

await prisma.$disconnect()
