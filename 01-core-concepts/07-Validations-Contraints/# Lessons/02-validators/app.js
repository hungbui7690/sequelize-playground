/*
  Validators
  - Model validators allow you to specify format/content/inheritance validations for each attribute of the model. Validations are automatically run on create, update and save. You can also call validate() to manually validate an instance.


******************************

  Per-attribute validations
  - You can define your custom validators or use several built-in validators, implemented by validator.js (10.11.0), as shown below.
    -> https://github.com/validatorjs/validator.js

  - Note that where multiple arguments need to be passed to the built-in validation functions, the arguments to be passed must be in an array. But if a single array argument is to be passed, for instance an array of acceptable strings for isIn, this will be interpreted as multiple string arguments instead of one array argument. To work around this pass a single-length array of arguments, such as [['foo', 'bar']] as shown above.


******************************

  - Hint: You can also define a custom function for the logging part. Just pass a function. The first parameter will be the string that is logged.  


*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

sequelize.define('foo', {
  bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i, // matches this RegExp
      is: ['^[a-z]+$', 'i'], // same as above, but constructing the RegExp from a string
      not: /^[a-z]+$/i, // does not match this RegExp
      not: ['^[a-z]+$', 'i'], // same as above, but constructing the RegExp from a string
      isEmail: true, // checks for email format (foo@bar.com)
      isUrl: true, // checks for url format (https://foo.com)
      isIP: true, // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true, // checks for IPv4 (129.89.23.1)
      isIPv6: true, // checks for IPv6 format
      isAlpha: true, // will only allow letters
      isAlphanumeric: true, // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true, // will only allow numbers
      isInt: true, // checks for valid integers
      isFloat: true, // checks for valid floating point numbers
      isDecimal: true, // checks for any numbers
      isLowercase: true, // checks for lowercase
      isUppercase: true, // checks for uppercase
      notNull: true, // won't allow null
      isNull: true, // only allows null
      notEmpty: true, // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo', // force specific substrings
      notIn: [['foo', 'bar']], // check the value is not one of these
      isIn: [['foo', 'bar']], // check the value is one of these
      notContains: 'bar', // don't allow specific substrings
      len: [2, 10], // only allow values with length between 2 and 10
      isUUID: 4, // only allow uuids
      isDate: true, // only allow date strings
      isAfter: '2011-11-05', // only allow date strings after a specific date
      isBefore: '2011-11-05', // only allow date strings before a specific date
      max: 23, // only allow values <= 23
      min: 23, // only allow values >= 23
      isCreditCard: true, // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!')
        }
      },

      // When using custom validator functions the error message will be whatever message the thrown Error object holds.
      // See the validator.js project for more details on the built in validation methods.
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.')
        }
      },
      // To use a custom error message instead of that provided by validator.js, use an object instead of the plain value or array of arguments, for example a validator which needs no argument can be given a custom message with
      isInt: {
        msg: 'Must be an integer number of pennies',
      },
      // or if arguments need to also be passed add an args property:
      isIn: {
        args: [['en', 'zh']],
        msg: 'Must be English or Chinese',
      },
    },
  },
})
