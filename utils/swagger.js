const swaggerJsDoc = require('swagger-jsdoc');


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Restaurant Management System APIS",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
  };
  
  const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;