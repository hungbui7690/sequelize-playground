/*
  Timestamps
  - By default, Sequelize automatically adds the fields createdAt and updatedAt to every model, using the data type DataTypes.DATE. Those fields are automatically managed as well - whenever you use Sequelize to create or update something, those fields will be set correctly. The createdAt field will contain the timestamp representing the moment of creation, and the updatedAt will contain the timestamp of the latest update.

  - Note: This is done in the Sequelize level (i.e. not done with SQL triggers). This means that direct SQL queries (for example queries performed without Sequelize by any other means) will not cause these fields to be updated automatically.


*************************


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

class User extends Model {
  username
}

// This behavior can be disabled for a model with the timestamps: false option
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
    timestamps: false,
  }
)

// 2. It is also possible to enable only one of createdAt/updatedAt, and to provide a custom name for these columns:
class Foo extends Model {}
Foo.init(
  {},
  {
    sequelize,

    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
  }
)
