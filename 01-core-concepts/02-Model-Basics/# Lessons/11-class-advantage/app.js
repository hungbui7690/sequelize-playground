/*
  Taking advantage of Models being classes
  - The Sequelize models are ES6 classes. You can very easily add custom instance or class level methods.


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

class User extends Model {
  static classLevelMethod() {
    return 'foo'
  }
  instanceLevelMethod() {
    return 'bar'
  }
  getFullname() {
    return [this.firstname, this.lastname].join(' ')
  }
}

User.init(
  {
    firstname: Sequelize.TEXT,
    lastname: Sequelize.TEXT,
  },
  { sequelize }
)

console.log(User.classLevelMethod()) // 'foo'
const user = User.build({ firstname: 'Jane', lastname: 'Doe' })
console.log(user.instanceLevelMethod()) // 'bar'
console.log(user.getFullname()) // 'Jane Doe'
