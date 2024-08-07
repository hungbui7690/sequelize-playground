/*
  Indexes
  - Sequelize supports adding indexes to the model definition which will be created on sequelize.sync().

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
