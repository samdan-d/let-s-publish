'use strict';

const PORT = process.env.PORT || 8082;

const express = require('express');
const router = express.Router()

require('./src/db')();
require('./src/Model');

const app = express();
app.use(express.json());

app.use('/api/', require('./src/ProfileRoutes')(router));

app.listen(PORT);
console.log(`Profile api running on http://localhost:${PORT}`);