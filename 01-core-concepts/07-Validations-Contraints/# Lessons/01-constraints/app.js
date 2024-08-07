/*
  Difference between Validations and Constraints
  - Validations are checks performed in the Sequelize level, in pure JavaScript. They can be arbitrarily complex if you provide a custom validator function, or can be one of the built-in validators offered by Sequelize. If a validation fails, no SQL query will be sent to the database at all.
  - On the other hand, constraints are rules defined at SQL level. The most basic example of constraint is an Unique Constraint. If a constraint check fails, an error will be thrown by the database and Sequelize will forward this error to JavaScript (in this example, throwing a SequelizeUniqueConstraintError). Note that in this case, the SQL query was performed, unlike the case for validations.


******************************

  Unique Constraint
  - When this model is synchronized (by calling sequelize.sync for example), the username field will be created in the table as `username` TEXT UNIQUE, and an attempt to insert an username that already exists there will throw a SequelizeUniqueConstraintError.


******************************

  Allowing/disallowing null values
  - By default, null is an allowed value for every column of a model. This can be disabled setting the allowNull: false option for a column, as it was done in the username field from our code example
  - Without allowNull: false, the call User.create({}) would work.

  Note about allowNull implementation
  - The allowNull check is the only check in Sequelize that is a mix of a validation and a constraint in the senses described at the beginning of this tutorial. This is because:
  - If an attempt is made to set null to a field that does not allow null, a ValidationError will be thrown without any SQL query being performed.
  - In addition, after sequelize.sync, the column that has allowNull: false will be defined with a NOT NULL SQL constraint. This way, direct SQL queries that attempt to set the value to null will also fail.


*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

const User = sequelize.define('user', {
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
})

;(async () => {
  await sequelize.sync({ force: true })
  // Code here
})()
