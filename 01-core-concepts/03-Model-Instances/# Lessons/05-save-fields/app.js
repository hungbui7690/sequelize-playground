/*
  Saving only some fields
  - It is possible to define which attributes should be saved when calling save, by passing an array of column names.


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

// This is useful when you set attributes based on a previously defined object, for example, when you get the values of an object via a form of a web app. Furthermore, this is used internally in the update implementation. This is how it looks like:
const jane = await User.create({ name: 'Jane' })
console.log(jane.name) // "Jane"
console.log(jane.favoriteColor) // "green"

// Update fields
jane.name = 'Jane II'
jane.favoriteColor = 'blue'

// Just save the name field
await jane.save({ fields: ['name'] })
console.log(jane.name) // "Jane II"
console.log(jane.favoriteColor) // "blue"

// The above printed blue because the local object has it set to blue, but in the database it is still "green":
await jane.reload()
console.log(jane.name) // "Jane II"
console.log(jane.favoriteColor) // "green"

// The save method is optimized internally to only update fields that really changed. This means that if you don't change anything and call save, Sequelize will know that the save is superfluous and do nothing, i.e., no query will be generated (it will still return a Promise, but it will resolve immediately).
// Also, if only a few attributes have changed when you call save, only those fields will be sent in the UPDATE query, to improve performance.
