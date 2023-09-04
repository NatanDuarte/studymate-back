require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const socketAdapter = require('./src/adapters/socketAdapter');


const app = express()
const server = http.createServer(app);

socketAdapter(server);

app.use(bodyParser.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

const port = process.env.PORT;

server.listen(
    port,
    () => console.log(`Application up: http://localhost:${port}/api-docs`)
);
