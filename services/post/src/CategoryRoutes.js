const mongoose = require('mongoose');

const Category = mongoose.model('Category');

module.exports = (r) => {
  r.post('/', (req, res) => {
    if (req.user.isAdmin && req.body.name) {
      Category.create({name: req.body.name})
        .then((category) => res.json({category}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.put('/:id', (req, res) => {
    if (req.user.isAdmin && req.body.name && req.params.id) {
      Category.findByIdAndUpdate(req.params.id, {name: req.body.name})
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
      Category.findByIdAndRemove(req.params.id)
        .then((category) => {
          if (category)
            res.json({category})
          else
            res.status(404).json({error: 'not found'})
        })
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.get('/:id', (req, res) => {
    Category.findById(req.params.id)
      .then((category) => {
        if (category)
          res.json({category})
        else
          res.status(404).json({error: 'not found'})
      })
      .catch((error) => res.status(400).json({error}));
  });

  r.get('/', (req, res) => {
    Category.find()
      .then((categories) => res.json({categories}))
      .catch((error) => res.status(400).json({error}));
  });

  return r;
};