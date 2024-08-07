/*
  Simple SELECT queries
  - You can read the whole table from the database with the findAll method:


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

// SELECT * FROM USER
const users = await User.findAll()
console.log(users.every((user) => user instanceof User)) // true
console.log('All users:', JSON.stringify(users, null, 2))
