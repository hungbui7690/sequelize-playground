/*
  Updating an instance


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

// 1. If you change the value of some field of an instance, calling save again will update it accordingly:
const jane = await User.create({ name: 'Jane' })

jane.name = 'Ada' // the name is still "Jane" in the database
await jane.save() // Now the name was updated to "Ada" in the database!

// 2. You can update several fields at once with the set method:
jane.set({
  name: 'Alex',
  favoriteColor: 'blue',
})
await jane.save() // The database now has "Ada" and "blue" for name and favorite color

// 3. Note that the save() here will also persist any other changes that have been made on this instance, not just those in the previous set call. If you want to update a specific set of fields, you can use update:
await jane.update({ name: 'Ted' })
await jane.save()
