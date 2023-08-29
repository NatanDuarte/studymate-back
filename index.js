require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes')

const app = express()

app.use(bodyParser.json())
app.use(cors());
routes(app);

const port = process.env.PORT;

app.listen(port, () => console.log(`Running at ${port}`));
