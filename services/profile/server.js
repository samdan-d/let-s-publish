'use strict';

const PORT = process.env.PORT || 8082;

const express = require('express');
const Multer = require('multer');
const cors = require('cors');
const router = express.Router()

require('./src/db')();
require('./src/Model');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', require('./src/ProfileRoutes')(router, multer));

app.listen(PORT);
console.log(`Profile api running on http://localhost:${PORT}`);