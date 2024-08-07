/*
  Migrations
  - Just like you use version control systems such as Git to manage changes in your source code, you can use migrations to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

  - You will need the Sequelize Command-Line Interface (CLI). The CLI ships support for migrations and project bootstrapping.

  - A Migration in Sequelize is a javascript file which exports two functions, up and down, that dictates how to perform the migration and undo it. You define those functions manually, but you don't call them manually; they will be called automatically by the CLI. In these functions, you should simply perform whatever queries you need, with the help of sequelize.query and whichever other methods Sequelize provides to you. There is no extra magic beyond that.


*****************************
  Installing the CLI
  ~~ npm install --save-dev sequelize-cli


*****************************

  - To create an empty project you will need to execute init command

  @@ npx sequelize-cli init

  - This will create following folders
    + config, contains config file, which tells CLI how to connect with database
    + models, contains all models for your project
    + migrations, contains all migration files
    + seeders, contains all seed files


*****************************

  Configuration
  - Before continuing further we will need to tell the CLI how to connect to the database. To do that let's open default config file config/config.json.







*/

const { Sequelize, Op, Model, DataTypes } = require('sequelize')

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

const User = sequelize.define(
  'User',
  {
    /* attributes */
  },
  {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['email'],
      },

      // Creates a gin index on data with the jsonb_path_ops operator
      {
        fields: ['data'],
        using: 'gin',
        operator: 'jsonb_path_ops',
      },

      // By default index name will be [table]_[fields]
      // Creates a multi column partial index
      {
        name: 'public_by_author',
        fields: ['author', 'status'],
        where: {
          status: 'public',
        },
      },

      // A BTREE index with an ordered field
      {
        name: 'title_index',
        using: 'BTREE',
        fields: [
          'author',
          {
            name: 'title',
            collate: 'en_US',
            order: 'DESC',
            length: 5,
          },
        ],
      },
    ],
  }
)
