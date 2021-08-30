const express = require('express');
const cors = require('cors');
const route = require('./routes');

require('./config/db').connect();
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat Bot API',
      version: '1.0.0',
      description: 'API document',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}}`);
});
