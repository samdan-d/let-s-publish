'use strict';

const PORT = process.env.PORT || 8080;

const express = require('express');

require('./src/db');
require('./src/Model');

const app = express();

require('./src/Postroutes')(app);

app.listen(PORT);
console.log(`Post api running on http://localhost:${PORT}`);