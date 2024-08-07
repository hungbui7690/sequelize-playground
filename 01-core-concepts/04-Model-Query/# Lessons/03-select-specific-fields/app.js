/*
  Specifying attributes for SELECT queries
  - To select only some attributes, you can use the attributes option


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
  age: DataTypes.INTEGER,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

await User.sync({ force: true })

const jane = await User.create({ username: 'Jane', age: 18 })
const alex = await User.create({ username: 'Alex', age: 22 })

// Select specific fields -> only get username & age
// Alias -> ['username', 'name'] -> username as name
// SELECT username as name, age FROM USER
const users = await User.findAll({
  attributes: [['username', 'name'], 'age'],
})
console.log('All users:', JSON.stringify(users, null, 2))
