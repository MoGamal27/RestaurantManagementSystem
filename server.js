require('dotenv').config();
const express = require('express');
const { PORT } = process.env;
const db = require('./models');
const routes = require('./routes/index');
const appError = require('./utils/appError');
const globalError = require('./middleware/errorMiddleware');
const initializeCronJobs = require('./config/cronJobs')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger')


const app = express();

app.use(express.json());




// main system routes
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all("*", (req, res, next) => {
  next(new appError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware For Express
app.use(globalError);

db.sequelize.sync({alter: true})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Database connected successfully');
      // Initialize cron jobs
      initializeCronJobs();
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });