/*
  Incrementing and decrementing integer values
  - In order to increment/decrement values of an instance without running into concurrency issues, Sequelize provides the increment and decrement instance methods.


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

const jane = await User.create({ name: 'Jane', age: 100 })
const incrementResult = await jane.increment('age', { by: 2 })
// Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`
// In PostgreSQL, `incrementResult` will be the updated user, unless the option
// `{ returning: false }` was set (and then it will be undefined).

// In other dialects, `incrementResult` will be undefined. If you need the updated instance, you will have to call `user.reload()`.
await jane.reload()

// You can also increment multiple fields at once:
const alex = await User.create({ name: 'Alex', age: 100, cash: 5000 })
await alex.increment({
  age: 2,
  cash: 100,
})

// If the values are incremented by the same amount, you can use this other syntax as well:
await alex.increment(['age', 'cash'], { by: 2 })
