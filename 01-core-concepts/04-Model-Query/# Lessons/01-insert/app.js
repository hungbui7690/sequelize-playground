/*
  Model Querying - Basics
  - Sequelize provides various methods to assist querying your database for data.

  - Important notice: to perform production-ready queries with Sequelize, make sure you have read the Transactions guide as well. Transactions are important to ensure data integrity and to provide other benefits.


***************************

  Insert Query


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.TEXT,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

await User.sync({ force: true }) // run this to recreate table

// 1. The Model.create() method is a shorthand for building an unsaved instance with Model.build() and saving the instance with instance.save().
const jane = await User.create({ username: 'Jane' })
console.log("Jane's auto-generated ID:", jane.id)

// 2. It is also possible to define which attributes can be set in the create method. This can be especially useful if you create database entries based on a form which can be filled by a user. Using that would, for example, allow you to restrict the User model to set only an username but not an admin flag (i.e., isAdmin):
const user = await User.create(
  {
    username: 'alice123',
    isAdmin: true,
  },
  { fields: ['username'] }
)
// let's assume the default of isAdmin is false
console.log(user.username) // 'alice123'
console.log(user.isAdmin) // false
