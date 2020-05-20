const mongoose = require('mongoose');
const {Schema} = mongoose;

const postCommentSchema = new Schema({
  _post: {
    type: Schema.Types.ObjectId,
    required: true
  },
  comments: [{
    _user: {
      type: Schema.Types.ObjectId,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
  }]
}, {timestamps: true});

mongoose.model('Comment', postCommentSchema);