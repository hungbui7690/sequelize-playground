/*
  Delete an instance


***************************

  Reload an instance


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

const User = sequelize.define('user', {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green',
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
})

// 1. You can delete an instance by calling destroy:
const jane = await User.create({ name: 'Jane' })
console.log(jane.name) // "Jane"
await jane.destroy()
// Now this entry was removed from the database

// 2. Reload an instance
const alex = await User.create({ name: 'Alex' })
console.log(alex.name) // "Alex"
await alex.reload()
// The reload call generates a SELECT query to get the up-to-date data from the database.
