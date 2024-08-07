/*
  Caveat with Public Class Fields
  - Adding a Public Class Field with the same name as one of the model's attribute is going to cause issues. Sequelize adds a getter & a setter for each attribute defined through Model.init. 
  - Adding a Public Class Field will shadow those getter and setters, blocking access to the model's actual data.


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
  define: {
    freezeTableName: true, // Sequelize will infer the table name to be equal to the model name, without any modifications -> can place this option at User.init as well
  },
})

class User extends Model {
  // id // this field will shadow sequelize's getter & setter. It should be removed.
  // declare id: number // this is for typescript -> use declare keyword
  username // this field does not shadow anything. It is fine.
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize }
)

const user = new User({ id: 1 })
console.log('id: ', user.id) // 1
console.log('username: ', username) // undefined
