const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = app => {
  app.get('/api/posts/hello', async (req, res) => {
    res.send('world');
  });
};