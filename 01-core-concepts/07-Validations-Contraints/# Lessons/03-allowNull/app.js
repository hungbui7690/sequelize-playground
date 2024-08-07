/*
  allowNull interaction with other validators
  - If a particular field of a model is set to not allow null (with allowNull: false) and that value has been set to null, all validators will be skipped and a ValidationError will be thrown.

  - On the other hand, if it is set to allow null (with allowNull: true) and that value has been set to null, only the built-in validators will be skipped, while the custom validators will still run. 


*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

// This means you can, for instance, have a string field which validates its length to be between 5 and 10 characters, but which also allows null (since the length validator will be skipped automatically when the value is null):
class User extends Model {}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 10],

        // You also can conditionally allow null values, with a custom validator, since it won't be skipped:
        customValidator(value) {
          if (value === null && this.age !== 10) {
            throw new Error("name can't be null unless age is 10")
          }
        },

        // You can customize allowNull error message by setting the notNull validator:
        notNull: {
          msg: 'Please enter your name',
        },
      },
    },
  },
  { sequelize }
)
