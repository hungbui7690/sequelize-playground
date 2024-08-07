/*
  Applying WHERE clauses
  - The where option is used to filter the query. There are lots of operators to use for the where clause, available as Symbols from Op.


*/

import { Sequelize, DataTypes, Model } from 'sequelize'

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

// 1. SELECT * FROM post WHERE authorId = 2;
const posts = await Post.findAll({
  where: {
    authorID: 2,
  },
})
console.log(JSON.stringify(posts, null, 2))

// # Observe that no operator (from Op) was explicitly passed, so Sequelize assumed an equality comparison by default. The above code is equivalent to:
import { Op } from 'sequelize'
// Post.findAll({
//   where: {
//     authorId: {
//       [Op.eq]: 2,
//     },
//   },
// })

// 2. Multiple checks can be passed:
// SELECT * FROM post WHERE authorId = 12 AND status = 'active';
const active = await Post.findAll({
  where: {
    authorId: 2,
    title: 'Post 2',
  },
})
console.log(JSON.stringify(active, null, 2))

// # The code above is equivalent to:
// Post.findAll({
//   where: {
//     [Op.and]: [{ authorId: 12 }, { status: 'active' }],
//   },
// })

// 3. An OR can be easily performed in a similar way:
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
const or = await Post.findAll({
  where: {
    [Op.or]: [{ authorId: 1 }, { authorId: 2 }],
  },
})
console.log(JSON.stringify(or, null, 2))

// # Since the above was an OR involving the same field, Sequelize allows you to use a slightly different structure which is more readable and generates the same behavior:
// DELETE FROM post WHERE authorId = 12 OR authorId = 13;
const { Op } = require('sequelize')
Post.destroy({
  where: {
    authorId: {
      [Op.or]: [12, 13],
    },
  },
})
