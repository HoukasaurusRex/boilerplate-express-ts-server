import { QueryInterface } from 'sequelize'
import { Users } from '../db'
import { hash } from 'bcrypt'

export default {
  up: async (query: QueryInterface): Promise<void> => {
    await query.bulkInsert(Users.tableName, [
      {
        email: 'fred.johnson@gmail.com',
        password: await hash('free the belt555', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'joe.miller@icloud.com',
        password: await hash('no-laws-just-cops1234', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'chrisjen.avasarala@outlook.com',
        password: await hash('damn.the.martians88', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (query: QueryInterface): Promise<void> => {
    await query.bulkDelete(Users.tableName, {})
  },
}
