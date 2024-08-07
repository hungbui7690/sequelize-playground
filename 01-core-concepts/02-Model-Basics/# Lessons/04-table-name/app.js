/*
  Providing the table name directly


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

class User extends Model {
  username
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'Employees', // You can simply tell Sequelize the name of the table directly as well
  }
)

const user = new User({ id: 1 })
