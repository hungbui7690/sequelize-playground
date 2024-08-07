/*
  Aggregate Function


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
const jack = await User.create({ username: 'Jack', age: 22 })

// 1. You can use sequelize.fn to do aggregations:
const countAge = await User.findAll({
  attributes: [
    'id',
    'username',
    'isAdmin',
    'age',
    [sequelize.fn('COUNT', sequelize.col('age')), 'count_age'],
  ],
})
// SELECT id, username, isAdmin, age, COUNT(age) AS count_age FROM USER

console.log('countAge', JSON.stringify(countAge, null, 2))

// 2. This is shorter, and less error prone because it still works if you add / remove attributes from your model later -> include
const include = User.findAll({
  attributes: {
    include: [[sequelize.fn('COUNT', sequelize.col('age')), 'count_age']],
  },
})
// SELECT id, username, isAdmin, age, COUNT(age) AS count_age FROM USER

console.log('include: ', JSON.stringify(include, null, 2)) // -> NOT WORK -> DON"T KNOW

// 3. Similarly, it's also possible to remove a selected few attributes:
const exclude = User.findAll({
  attributes: { exclude: ['age'] },
})
console.log('exclude: ', JSON.stringify(exclude, null, 2)) // -> NOT WORK -> DON"T KNOW
