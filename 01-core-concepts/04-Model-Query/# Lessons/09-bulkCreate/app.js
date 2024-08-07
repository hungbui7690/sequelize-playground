/*
  Creating in bulk
  - Sequelize provides the Model.bulkCreate method to allow creating multiple records at once, with only one query.
  - The usage of Model.bulkCreate is very similar to Model.create, by receiving an array of objects instead of a single object.


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// 1. The usage of Model.bulkCreate is very similar to Model.create, by receiving an array of objects instead of a single object.
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' },
])
console.log(captains.length) // 2
console.log(captains[0] instanceof Captain) // true
console.log(captains[0].name) // 'Jack Sparrow'
console.log(captains[0].id) // 1 // (or another auto-generated value)

// 2. However, by default, bulkCreate does not run validations on each object that is going to be created (which create does). To make bulkCreate run these validations as well, you must pass the validate: true option. This will decrease performance. Usage example:
const Foo = sequelize.define('foo', {
  name: {
    type: DataTypes.TEXT,
    validate: {
      len: [4, 6],
    },
  },
})

// This will not throw an error, both instances will be created
await Foo.bulkCreate([{ name: 'abc123' }, { name: 'name too long' }])

// This will throw an error, nothing will be created
await Foo.bulkCreate([{ name: 'abc123' }, { name: 'name too long' }], {
  validate: true,
})

// 3. If you are accepting values directly from the user, it might be beneficial to limit the columns that you want to actually insert. To support this, bulkCreate() accepts a fields option, an array defining which fields must be considered (the rest will be ignored).
await User.bulkCreate([{ username: 'foo' }, { username: 'bar', admin: true }], {
  fields: ['username'],
})
// Neither foo nor bar are admins.
