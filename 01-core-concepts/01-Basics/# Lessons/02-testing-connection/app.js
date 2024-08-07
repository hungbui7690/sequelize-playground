/*
  Testing Connection
    @@ npm install sqlite3

  - To test
    -> using authenticate()


*/

import { Sequelize } from 'sequelize'

// config -> need to use this way -> since the other way is almost deprecated
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
})

try {
  await sequelize.authenticate() // open connection
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

// close connection
sequelize.close()
