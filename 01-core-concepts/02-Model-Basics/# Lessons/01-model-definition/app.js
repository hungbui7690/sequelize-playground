/*
  Model Basics
  - Models are the essence of Sequelize. A model is an abstraction that represents a table in your database. In Sequelize, it is a class that extends Model.


***************************

  Model Definition
  - sequelize.define(modelName, attributes, options)


*/

import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

const User = sequelize.define(
  'User',
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
    // options
  }
)

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User) // true
