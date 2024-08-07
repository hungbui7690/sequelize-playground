/*
  Connection Pool
  - If you're connecting to the database from a single process, you should create only one Sequelize instance. Sequelize will set up a connection pool on initialization. This connection pool can be configured through the constructor's options parameter (using options.pool)

*/

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})
