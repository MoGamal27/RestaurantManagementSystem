require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const db = require('./models');



const app = express();


db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Database connected successfully');
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });