const mongoose = require('mongoose');

const Tag = mongoose.model('Tag');

module.exports = (r) => {
  r.post('/', (req, res) => {
    if (req.user.isAdmin && req.body.name) {
      Tag.create({name: req.body.name})
        .then((tag) => res.json({tag}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.put('/:id', (req, res) => {
    if (req.user.isAdmin && req.body.name && req.params.id) {
      Tag.findByIdAndUpdate(req.params.id, {name: req.body.name})
        .then((tag) => {
          if (tag)
            res.json({tag})
          else
            res.status(404).json({error: 'not found'})
        })
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.delete('/:id', (req, res) => {
    if (req.user.isAdmin && req.params.id) {
      Tag.findByIdAndRemove(req.params.id)
        .then((tag) => {
          if (tag)
            res.json({tag})
          else
            res.status(404).json({error: 'not found'})
        })
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.get('/:id', (req, res) => {
    Tag.findById(req.params.id)
      .then((tag) => {
        if (tag)
          res.json({tag})
        else
          res.status(404).json({error: 'not found'})
      })
      .catch((error) => res.status(400).json({error}));
  });

  r.get('/', (req, res) => {
    Tag.find()
      .then((tags) => res.json({tags}))
      .catch((error) => res.status(400).json({error}));
  });

  return r;
};