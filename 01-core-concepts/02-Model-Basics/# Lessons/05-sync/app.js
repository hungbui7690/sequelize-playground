/*
  Providing the table name directly
  - When you define a model, you're telling Sequelize a few things about its table in the database. However, what if the table actually doesn't even exist in the database? What if it exists, but it has different columns, less columns, or any other difference?

  - This is where model synchronization comes in. A model can be synchronized with the database by calling model.sync(options), an asynchronous function (that returns a Promise). With this call, Sequelize will automatically perform an SQL query to the database. Note that this changes only the table in the database, not the model in the JavaScript side.

*******************************

  - User.sync() 
    -> This creates the table if it doesn't exist (and does nothing if it already exists)
  - User.sync({ force: true }) 
    -> This creates the table, dropping it first if it already existed
  - User.sync({ alter: true }) 
    -> This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.


*******************************

  - As shown above, sync({ force: true }) and sync({ alter: true }) can be destructive operations. Therefore, they are not recommended for production-level software. Instead, synchronization should be done with the advanced concept of Migrations, with the help of the Sequelize CLI.


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

class User extends Model {
  username
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
  }
)

await User.sync({ force: true })
console.log('The table for the User model was just (re)created!')
