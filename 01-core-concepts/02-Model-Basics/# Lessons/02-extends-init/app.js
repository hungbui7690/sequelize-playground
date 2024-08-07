/*
  Model Basics
  - Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.


***************************

  Extending Model
  - Extending Model and calling init(attributes, options)


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

class User extends Model {} // 1.

// 2. Internally, sequelize.define calls Model.init, so both approaches are essentially equivalent.
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // connection instance
    modelName: 'User', // when omit this, model name is the class name
  }
)
