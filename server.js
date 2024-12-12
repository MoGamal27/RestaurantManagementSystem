require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const db = require('./models');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use('/api', routes);

db.sequelize.sync({alter: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Database connected successfully');
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });