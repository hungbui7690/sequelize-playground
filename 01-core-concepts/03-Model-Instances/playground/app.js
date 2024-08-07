/*
  Virtual fields
  - Virtual fields are fields that Sequelize populates under the hood, but in reality they don't even exist in the database.

  - For example, let's say we have the firstName and lastName attributes for a User.
  - Again, this is only for the sake of an example.


*/

const { DataTypes } = require('sequelize')

// It would be nice to have a simple way to obtain the full name directly! We can combine the idea of getters with the special data type Sequelize provides for this kind of situation: DataTypes.VIRTUAL:
const User = sequelize.define('user', {
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!')
    },
  },
})

// The VIRTUAL field does not cause a column in the table to exist. In other words, the model above will not have a fullName column. However, it will appear to have it!
const user = await User.create({ firstName: 'John', lastName: 'Doe' })
console.log(user.fullName) // 'John Doe'
