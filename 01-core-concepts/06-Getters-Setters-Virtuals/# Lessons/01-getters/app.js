/*
  Getters, Setters & Virtuals
  - Sequelize allows you to define custom getters and setters for the attributes of your models.
  - Sequelize also allows you to specify the so-called virtual attributes, which are attributes on the Sequelize Model that doesn't really exist in the underlying SQL table, but instead are populated automatically by Sequelize. They are very useful to create custom attributes which also could simplify your code, for example.


*********************************

  Getters


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// A getter is a get() function defined for one column in the model definition:
const User = sequelize.define('user', {
  // Let's say we wanted to see every username in uppercase, even
  // though they are not necessarily uppercase in the database itself
  username: {
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('username')
      return rawValue ? rawValue.toUpperCase() : null
    },
  },
})

// This getter, just like a standard JavaScript getter, is called automatically when the field value is read:
const user = User.build({ username: 'SuperUser123' })
console.log(user.username) // 'SUPERUSER123'
console.log(user.getDataValue('username')) // 'SuperUser123'

// Note that, although SUPERUSER123 was logged above, the value truly stored in the database is still SuperUser123. We used this.getDataValue('username') to obtain this value, and converted it to uppercase.
// Had we tried to use this.username in the getter instead, we would have gotten an infinite loop! This is why Sequelize provides the getDataValue method.
