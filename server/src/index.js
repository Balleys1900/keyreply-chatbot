const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const route = require('./routes');

require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { setUserStatus } = require('./middlewares/chatbot');

//connect db
db.connect();

//Swagger UI
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
app.post('/test', setUserStatus);

const openapiSpecification = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
