const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

module.exports = (r) => {
  r.post('/write-post-comment', async (req, res) => {
    if (!req.body._post || !req.body.comment) return res.status(400).json({error: '_post or comment is empty'});
    try {
      let postComment = await Comment.findOne({_post: req.body._post});
      const comment = {_user: req.user.id, comment: req.body.comment};
      if (postComment == null) {
        postComment = new Comment({
          _post: req.body._post,
          comments: [comment]
        });
      } else {
        postComment.comments.push(comment)
      }
      await postComment.save();
      res.json(postComment);
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e})
    }
  });

  r.delete('/remove-post-comment/:_post', async (req, res) => {
    const _post = req.params._post;
    const cId = req.query.cId;
    if (!_post || !cId) return res.status(400).json({error: 'comment id or _post required'});

    try {
      let postComment = await Comment.findOne({_post});
      if (postComment != null) {
        postComment.comments = postComment.comments.filter(c => c._id.toString() !== cId);
        await postComment.save();
      }
      res.json(postComment);
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e})
    }
  });

  r.get('/get-post-comment/:_post', async (req, res) => {
    const _post = req.params._post;
    if (!_post) return res.status(400).json({error: '_post is required'});

    try {
      let postComment = await Comment.findOne({_post});
      if (postComment != null) {
        res.json(postComment);
      } else {
        res.status(404).json({error: `not found with ${_post}`});
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e})
    }
  });

  r.get('/', async (req, res) => {
    try {
      let postComments = await Comment.find();
      res.json(postComments);
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e})
    }
  });

  return r;
};