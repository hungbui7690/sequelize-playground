/*
  Logging
    @@ npm install winston

  - must use this, otherwise error, since param needs to be string, cannot be object 
    -> const sequelize = new Sequelize('sqlite::memory:', {logging}


*/

import { Sequelize } from 'sequelize'
import winston from 'winston' // 1.

// 2. log will be create to file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // important level = error
    new winston.transports.File({ filename: 'combined.log' }), // important level = info
  ],
})

const sequelize = new Sequelize('sqlite::memory:', {
  logging: (msg) => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
})

try {
  await sequelize.authenticate() // open connection
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

sequelize.close()
