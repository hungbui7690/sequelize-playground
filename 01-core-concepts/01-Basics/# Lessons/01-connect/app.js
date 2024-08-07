/*
  Installation
  @@ npm install --save sequelize

  - You'll also have to manually install the driver for your database of choice:
  
    $ npm install --save pg pg-hstore # Postgres
    $ npm install --save mysql2
    $ npm install --save mariadb
    $ npm install --save sqlite3
    $ npm install --save tedious # Microsoft SQL Server
    $ npm install --save oracledb # Oracle Database


**************************

  Connecting to a database
  - we will connect to sqlite

*/

const { Sequelize } = require('sequelize')

// Option 1: Passing a connection URI
const sqliteMemory = new Sequelize('sqlite::memory:') // Example for sqlite
const postgres = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// Option 2: Passing parameters separately (sqlite)
const sequelizeFile = new Sequelize({
  dialect: 'sqlite',
  storage: './chinook.db',
})

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect:
    sqlite /* mysql | postgres | sqlite | mariadb | mssql | db2 | snowflake | oracle */,
})
