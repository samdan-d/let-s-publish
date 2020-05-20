'use strict';

const PORT = process.env.PORT || 8080;

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('./src/db')();
require('./src/Model');

const app = express();
const routerPost = express.Router();
const routerCategory = express.Router();
const routerTag = express.Router();

app.use(cors());
app.use(express.json());
app.use(authenticate);
app.use('/api/posts', require('./src/PostRoutes')(routerPost));
app.use('/api/categories', require('./src/CategoryRoutes')(routerCategory));
app.use('/api/tags', require('./src/TagRoutes')(routerTag));

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