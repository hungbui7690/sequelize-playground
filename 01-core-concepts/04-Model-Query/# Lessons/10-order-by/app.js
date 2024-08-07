/*
  ORDER BY
  - The order option takes an array of items to order the query by or a sequelize method. These items are themselves arrays in the form [column, direction]. The column will be escaped correctly and the direction will be checked in a whitelist of valid directions (such as ASC, DESC, NULLS FIRST, etc).

  - To recap, the elements of the order array can be the following:
    + A string (which will be automatically quoted)
    + An array, whose first element will be quoted, second will be appended verbatim
    + An object with a raw field:
    + The content of raw will be added verbatim without quoting
    + Everything else is ignored, and if raw is not set, the query will fail
    + A call to Sequelize.fn (which will generate a function call in SQL)
    + A call to Sequelize.col (which will quote the column name)

*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

Subtask.findAll({
  order: [
    // Will escape title and validate DESC against a list of valid direction parameters
    ['title', 'DESC'],

    // Will order by max(age)
    sequelize.fn('max', sequelize.col('age')),

    // Will order by max(age) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],

    // Will order by  otherfunction(`col1`, 12, 'lalala') DESC
    [
      sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'),
      'DESC',
    ],

    // Will order an associated model's createdAt using the model name as the association's name.
    [Task, 'createdAt', 'DESC'],

    // Will order through an associated model's createdAt using the model names as the associations' names.
    [Task, Project, 'createdAt', 'DESC'],

    // Will order by an associated model's createdAt using the name of the association.
    ['Task', 'createdAt', 'DESC'],

    // Will order by a nested associated model's createdAt using the names of the associations.
    ['Task', 'Project', 'createdAt', 'DESC'],

    // Will order by an associated model's createdAt using an association object. (preferred method)
    [Subtask.associations.Task, 'createdAt', 'DESC'],

    // Will order by a nested associated model's createdAt using association objects. (preferred method)
    [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],

    // Will order by an associated model's createdAt using a simple association object.
    [{ model: Task, as: 'Task' }, 'createdAt', 'DESC'],

    // Will order by a nested associated model's createdAt simple association objects.
    [
      { model: Task, as: 'Task' },
      { model: Project, as: 'Project' },
      'createdAt',
      'DESC',
    ],
  ],

  // Will order by max age descending
  order: sequelize.literal('max(age) DESC'),

  // Will order by max age ascending assuming ascending is the default order when direction is omitted
  order: sequelize.fn('max', sequelize.col('age')),

  // Will order by age ascending assuming ascending is the default order when direction is omitted
  order: sequelize.col('age'),

  // Will order randomly based on the dialect (instead of fn('RAND') or fn('RANDOM'))
  order: sequelize.random(),
})

Foo.findOne({
  order: [
    // will return `name`
    ['name'],
    // will return `username` DESC
    ['username', 'DESC'],
    // will return max(`age`)
    sequelize.fn('max', sequelize.col('age')),
    // will return max(`age`) DESC
    [sequelize.fn('max', sequelize.col('age')), 'DESC'],
    // will return otherfunction(`col1`, 12, 'lalala') DESC
    [
      sequelize.fn('otherfunction', sequelize.col('col1'), 12, 'lalala'),
      'DESC',
    ],
    // will return otherfunction(awesomefunction(`col`)) DESC, This nesting is potentially infinite!
    [
      sequelize.fn(
        'otherfunction',
        sequelize.fn('awesomefunction', sequelize.col('col'))
      ),
      'DESC',
    ],
  ],
})
