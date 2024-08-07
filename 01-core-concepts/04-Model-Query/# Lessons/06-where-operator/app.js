/*
  Operators
  - Sequelize provides several operators.  
      [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
      [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)


****************************

  - Basics
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

  
****************************

  - Using dialect specific column identifiers (PG in the following example):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"


****************************

  - Number comparisons
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15


****************************

  - Other operators
      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3],                        // ANY (ARRAY[2, 3]::INTEGER[]) (PG only)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)


****************************

  - In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY (ARRAY['cat', 'hat'])


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

// 1. Passing an array directly to the where option will implicitly use the IN operator:
// SELECT ... FROM "posts" AS "post" WHERE "post"."id" IN (1, 2, 3);
Post.findAll({
  where: {
    id: [1, 2, 3], // Same as using `id: { [Op.in]: [1,2,3] }`
  },
})

// rank < 1000 OR rank IS NULL
Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null,
      },
    },
    // rank < 1000 OR rank IS NULL
  },
})

// createdAt < [timestamp] AND createdAt > [timestamp]
Foo.findAll({
  where: {
    createdAt: {
      [Op.lt]: new Date(),
      [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
    },
  },
})

// title LIKE 'Boat%' OR description LIKE '%boat%'
Foo.findAll({
  where: {
    [Op.or]: [
      {
        title: {
          [Op.like]: 'Boat%',
        },
      },
      {
        description: {
          [Op.like]: '%boat%',
        },
      },
    ],
  },
})

/*
  WHERE (
    Projects.name = 'Some Project'
    AND NOT (
      Projects.id IN (1,2,3) AND Projects.description LIKE 'Hello%'
    ))
*/
Project.findAll({
  where: {
    name: 'Some Project',
    [Op.not]: [
      { id: [1, 2, 3] },
      {
        description: {
          [Op.like]: 'Hello%',
        },
      },
    ],
  },
})
