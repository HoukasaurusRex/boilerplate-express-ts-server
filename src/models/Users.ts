import { DataTypes, Model } from 'sequelize'

class User extends Model {
  static init(sequelize) {
    super.init({
      // Model attributes are defined here
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      }
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Users', // We need to choose the model name 
      paranoid: true
    })
  }
}

export default User