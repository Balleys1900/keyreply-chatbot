const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./config/db');
const route = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Chat Bot API',
			version: '1.0.0',
			description: 'API document'
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}],
	},
	apis: ['./src/routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


db.connect();
app.use(express.json());
app.use(cors());
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
