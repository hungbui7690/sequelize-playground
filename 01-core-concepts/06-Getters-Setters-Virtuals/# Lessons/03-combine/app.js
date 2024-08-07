/*
  Combining getters and setters
  - Getters and setters can be both defined in the same field.
  - For the sake of an example, let's say we are modeling a Post, whose content is a text of unlimited length. To improve memory usage, let's say we want to store a gzipped version of the content.


*/

import { Sequelize, DataTypes, Model, Op } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// Note: modern databases should do some compression automatically in these cases. Please note that this is just for the sake of an example.
const { gzipSync, gunzipSync } = require('zlib')

const Post = sequelize.define('post', {
  content: {
    type: DataTypes.TEXT,
    get() {
      const storedValue = this.getDataValue('content')
      const gzippedBuffer = Buffer.from(storedValue, 'base64')
      const unzippedBuffer = gunzipSync(gzippedBuffer)
      return unzippedBuffer.toString()
    },
    set(value) {
      const gzippedBuffer = gzipSync(value)
      this.setDataValue('content', gzippedBuffer.toString('base64'))
    },
  },
})

// With the above setup, whenever we try to interact with the content field of our Post model, Sequelize will automatically handle the custom getter and setter. For example:
const post = await Post.create({ content: 'Hello everyone!' })

console.log(post.content) // 'Hello everyone!'
// Everything is happening under the hood, so we can even forget that the
// content is actually being stored as a gzipped base64 string!

// However, if we are really curious, we can get the 'raw' data...
console.log(post.getDataValue('content'))
// Output: 'H4sIAAAAAAAACvNIzcnJV0gtSy2qzM9LVQQAUuk9jQ8AAAA='
