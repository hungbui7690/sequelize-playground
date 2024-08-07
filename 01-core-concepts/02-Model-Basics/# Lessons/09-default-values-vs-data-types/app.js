/*
  Shorthand


*************************

  Default Values


*************************

  Data Types
  - Every column you define in your model must have a data type. Sequelize provides a lot of built-in data types. To access a built-in data type, you must import DataTypes

    const { DataTypes } = require('sequelize')


*************************

  Strings

    DataTypes.STRING; // VARCHAR(255)
    DataTypes.STRING(1234); // VARCHAR(1234)
    DataTypes.TEXT; // TEXT
    DataTypes.TEXT('tiny'); // TINYTEXT
    DataTypes.BOOLEAN; // TINYINT(1)


  Numbers

    DataTypes.INTEGER; // INTEGER
    DataTypes.BIGINT; // BIGINT
    DataTypes.BIGINT(11); // BIGINT(11)

    DataTypes.FLOAT; // FLOAT
    DataTypes.FLOAT(11); // FLOAT(11)
    DataTypes.FLOAT(11, 10); // FLOAT(11,10)

    DataTypes.REAL; // REAL            PostgreSQL only.
    DataTypes.REAL(11); // REAL(11)        PostgreSQL only.
    DataTypes.REAL(11, 12); // REAL(11,12)     PostgreSQL only.

    DataTypes.DOUBLE; // DOUBLE
    DataTypes.DOUBLE(11); // DOUBLE(11)
    DataTypes.DOUBLE(11, 10); // DOUBLE(11,10)

    DataTypes.DECIMAL; // DECIMAL
    DataTypes.DECIMAL(10, 2); // DECIMAL(10,2)


  Dates

    DataTypes.DATE; // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
    DataTypes.DATE(6); // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
    DataTypes.DATEONLY; // DATE without time


  UUID
  - For UUIDs, use DataTypes.UUID. It becomes the UUID data type for PostgreSQL and SQLite, and CHAR(36) for MySQL. Sequelize can generate UUIDs automatically for these fields, simply use DataTypes.UUIDV1 or DataTypes.UUIDV4 as the default value:

    {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    }



*/

import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './temp.db',
})

// This:
sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
})

// Can be simplified to:
sequelize.define('User', { name: DataTypes.STRING })

sequelize.define('Order', {
  name: {
    type: DataTypes.STRING,
    defaultValue: 'John Doe', // Default Values
  },
  orderDate: DataTypes.NOW, // This way, the current date/time will be used to populate this column (at the moment of insertion)
})
