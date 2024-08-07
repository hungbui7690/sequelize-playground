/*
  Model-wide validations
  - Validations can also be defined to check the model after the field-specific validators. Using this you could, for example, ensure either neither of latitude and longitude are set or both, and fail if one but not the other is set.

  - Model validator methods are called with the model object's context and are deemed to fail if they throw an error, otherwise pass. This is just the same as with custom field-specific validators.

  - Any error messages collected are put in the validation result object alongside the field validation errors, with keys named after the failed validation method's key in the validate option object. Even though there can only be one error message for each model validation method at any one time, it is presented as a single string error in an array, to maximize consistency with the field errors.


*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

class Place extends Model {}
Place.init(
  {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    latitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.INTEGER,
      validate: {
        min: -180,
        max: 180,
      },
    },
  },
  {
    sequelize,
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error('Either both latitude and longitude, or neither!')
        }
      },

      // In this simple case an object fails validation if either latitude or longitude is given, but not both. If we try to build one with an out-of-range latitude and no longitude, somePlace.validate() might return:
      latitude: ['Invalid number: latitude'],
      bothCoordsOrNone: ['Either both latitude and longitude, or neither!'],
      // Such validation could have also been done with a custom validator defined on a single attribute (such as the latitude attribute, by checking (value === null) !== (this.longitude === null)), but the model-wide validation approach is cleaner.
    },
  }
)
