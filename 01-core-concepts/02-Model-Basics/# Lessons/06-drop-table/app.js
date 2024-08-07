/*
  Dropping tables


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
  }
)

// To drop the table related to a model:
await User.drop()
console.log('User table dropped!')

// To drop all tables:
await sequelize.drop()
console.log('All tables dropped!')

// Database safety check
// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ force: true, match: /_ser$/ })
