const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = (r) => {
  r.post('/', (req, res) => {
    if (req.user.isAdmin) {
      Post.create({
        _user: req.user.id,
        ...req.body
      })
        .then((post) => res.json({post}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'must be admin'})
    }
  });

  r.put('/:id', (req, res) => {
    if (req.user.isAdmin && req.params.id) {
      Post.findByIdAndUpdate(req.params.id, {
        _user: req.user.id,
        ...req.body
      })
        .then((post) => res.json({post}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'must be admin or valid id'})
    }
  });

  r.delete('/:id', (req, res) => {
    if (req.user.isAdmin && req.params.id) {
      Post.findByIdAndRemove(req.params.id)
        .then((post) => {
          if (post)
            res.json({post})
          else
            res.status(404).json({error: 'not found'})
        })
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (post)
          res.json({post})
        else
          res.status(404).json({error: 'not found'})
      })
      .catch((error) => res.status(400).json({error}));
  });

  r.get('/', (req, res) => {
    Post.find()
      .then((posts) => res.json({posts}))
      .catch((error) => res.status(400).json({error}));
  });

  return r;
};