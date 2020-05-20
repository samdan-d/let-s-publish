'use strict';

const PORT = process.env.PORT || 8083;

const express = require('express');
const jwt = require('jsonwebtoken');

require('./src/db')();
require('./src/Model');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(authenticate);
app.use('/api/notifications', require('./src/NotificationRoutes')(router));

app.listen(PORT);
console.log(`Post api running on http://localhost:${PORT}`);

function authenticate(req, res, next) {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      req.user = jwt.verify(token, 'secret-access');
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: {
        accessToken: 'access-token is invalid'
      }
    })
  }
}