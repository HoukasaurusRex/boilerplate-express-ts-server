import {
  BuildOptions,
  DataTypes,
  Model,
  Sequelize,
  InstanceUpdateOptions,
  CreateOptions,
} from 'sequelize'
import { hash, compare } from 'bcrypt'

export interface UserAttributes {
  id?: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  createdAt?: Date
  updatedAt?: Date
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserModel
}

export const hashPassword = async (
  user: UserModel,
  _options: InstanceUpdateOptions | CreateOptions
): Promise<void> => {
  const hashedPassword = await hash(user.password, 8)
  user.password = hashedPassword
}

export function UserFactory(sequelize: Sequelize): UserStatic {
  const Users = <UserStatic>sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      modelName: 'Users',
      paranoid: true, // This will set the deletedAt timestamp to filter results instead of deleting the row
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  )
  Users.prototype.validPassword = function (password) {
    return compare(password, this.password)
  }
  return Users
}
