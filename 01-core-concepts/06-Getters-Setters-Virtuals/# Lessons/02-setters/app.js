/*
  Setters
  - Note: The above examples involving password handling, although much better than simply storing the password in plaintext, are far from perfect security. Handling passwords properly is hard, everything here is just for the sake of an example to show Sequelize functionality. We suggest involving a cybersecurity expert and/or reading OWASP documents and/or visiting the InfoSec StackExchange.

  - https://owasp.org/
  - https://security.stackexchange.com/


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// A setter is a set() function defined for one column in the model definition. It receives the value being set:
const User = sequelize.define('user', {
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('password', hash(this.username + value))
    },
  },
})

const user = User.build({
  username: 'someone',
  password: 'NotSo§tr0ngP4$SW0RD!',
})
console.log(user.password) // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
console.log(user.getDataValue('password')) // '7cfc84b8ea898bb72462e78b4643cfccd77e9f05678ec2ce78754147ba947acc'
// Observe that Sequelize called the setter automatically, before even sending data to the database. The only data the database ever saw was the already hashed value.
