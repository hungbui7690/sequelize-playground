/*
  Update Queries

*************************

  Delete Queries


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// 1. Update queries also accept the where option, just like the read queries shown above.
// Change everyone without a last name to "Doe"
await User.update(
  { lastName: 'Doe' },
  {
    where: {
      lastName: null,
    },
  }
)

// 2. Delete queries also accept the where option, just like the read queries shown above.
// Delete everyone named "Jane"
await User.destroy({
  where: {
    firstName: 'Jane',
  },
})

// 3. To destroy everything the TRUNCATE SQL can be used:
// Truncate the table
await User.destroy({
  truncate: true,
})
