/*
  Creating an instance
  - Note, from the usage of await in the snippet above, that save is an asynchronous method. In fact, almost every Sequelize method is asynchronous; build is one of the very few exceptions.


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

// 1. Although a model is a class, you should not create instances by using the new operator directly. Instead, the build method should be used.
const jane = User.build({ name: 'Jane' })
console.log(jane instanceof User) // true
console.log(jane.name) // "Jane"

// 2. However, the code above does not communicate with the database at all (note that it is not even asynchronous)! This is because the build method only creates an object that represents data that can be mapped to a database. In order to really save (i.e. persist) this instance in the database, the save method should be used:
await jane.save()
console.log('Jane was saved to the database!')

// 3. Sequelize provides the create method, which combines the build and save methods shown above into a single method:
const alex = await User.create({ name: 'Alex' })
// Alex exists in the database now!

// 4. Trying to log a model instance directly to console.log will produce a lot of clutter, since Sequelize instances have a lot of things attached to them. Instead, you can use the .toJSON() method (which, by the way, automatically guarantees the instances to be JSON.stringify-ed well).
// console.log(jane); // Don't do this
console.log(jane.toJSON()) // This is good!
console.log(JSON.stringify(jane, null, 4)) // This is also good!

// 5. Built instances will automatically get default values:
console.log(jane.favoriteColor) // "green"
