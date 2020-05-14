import { DataTypes, Model } from 'sequelize'
import { hash, compare } from 'bcrypt'

async function hashPassword(user, options) {
  const hashedPassword = await hash(user.password, 8)
  user.password = hashedPassword
  return user
}

class User extends Model {
  static init(sequelize) {
    // @ts-ignore not sure what to do about this for now
    super.init(
      {
        // Model attributes are defined here
        email: {
          type: DataTypes.STRING,
          allowNull: false,
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
      },
      {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Users', // We need to choose the model name
        paranoid: true, // This will set the deletedAt timestamp to filter results instead of deleting the row
        hooks: {
          // hash passwords before storing
          beforeCreate: hashPassword,
          beforeUpdate: hashPassword,
        },
      }
    )
  }
  // instance level method to validate hashed password
  validPassword(password) {
    // @ts-ignore
    return compare(password, this.password)
  }
}

export default User
