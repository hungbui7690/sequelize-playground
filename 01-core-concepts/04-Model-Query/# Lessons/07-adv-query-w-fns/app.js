/*
  Advanced queries with functions (not just columns)
  ~~ where: sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7)

  - Note the usage of the sequelize.fn and sequelize.col methods, which should be used to specify an SQL function call and a table column, respectively. These methods should be used instead of passing a plain string (such as char_length(content)) because Sequelize needs to treat this situation differently (for example, using other symbol escaping approaches).


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

const Post = sequelize.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  authorID: DataTypes.INTEGER,
})

await Post.sync({ force: true })

const post1 = Post.create({
  title: 'Post 1',
  content: 'Description 1',
  authorID: 1,
})
const post2 = Post.create({
  title: 'Post 2',
  content: 'Description 2',
  authorID: 2,
})
const post3 = Post.create({
  title: 'Post 3',
  content: 'Description 3',
  authorID: 1,
})

// 1. What if you wanted to obtain something like WHERE char_length("content") = 7?
// SELECT ... FROM "posts" AS "post" WHERE char_length("content") = 7
await Post.findAll({
  where: sequelize.where(
    sequelize.fn('char_length', sequelize.col('content')),
    7
  ),
})
