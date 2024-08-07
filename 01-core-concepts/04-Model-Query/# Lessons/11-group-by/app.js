/*
  GROUP BY
  - The syntax for grouping and ordering are equal, except that grouping does not accept a direction as last argument of the array (there is no ASC, DESC, NULLS FIRST, etc).
  - You can also pass a string directly to group, which will be included directly (verbatim) into the generated SQL. Use with caution and don't use with user generated content.


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// yields 'GROUP BY name'
Project.findAll({ group: 'name' })
