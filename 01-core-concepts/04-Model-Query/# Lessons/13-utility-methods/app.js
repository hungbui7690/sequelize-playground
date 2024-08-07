/*
  Utility methods
  - Sequelize also provides a few utility methods.


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// # count
// The count method simply counts the occurrences of elements in the database.
console.log(`There are ${await Project.count()} projects`)

const amount = await Project.count({
  where: {
    id: {
      [Op.gt]: 25,
    },
  },
})
console.log(`There are ${amount} projects with an id greater than 25`)

// # max, min and sum
// Sequelize also provides the max, min and sum convenience methods.
// Let's assume we have three users, whose ages are 10, 5, and 40.
await User.max('age') // 40
await User.max('age', { where: { age: { [Op.lt]: 20 } } }) // 10
await User.min('age') // 5
await User.min('age', { where: { age: { [Op.gt]: 5 } } }) // 10
await User.sum('age') // 55
await User.sum('age', { where: { age: { [Op.gt]: 5 } } }) // 50

// # increment, decrement
// Sequelize also provides the increment convenience method.
// Let's assume we have a user, whose age is 10.
await User.increment({ age: 5 }, { where: { id: 1 } }) // Will increase age to 15
await User.increment({ age: -5 }, { where: { id: 1 } }) // Will decrease age to 5
