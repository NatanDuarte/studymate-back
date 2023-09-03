require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()

app.use(bodyParser.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes(app);

const port = process.env.PORT;

app.listen(port, () => console.log(`Running at http://localhost:${port}/api-docs`));
