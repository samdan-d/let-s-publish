const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  _user: Schema.Types.ObjectId,
  _category: Schema.Types.ObjectId,
  _tags: [Schema.Types.ObjectId],
  _images: [Schema.Types.ObjectId],
  state: {
    type: String,
    enum: ['publish', 'draft'],
    default: 'publish'
  },
  content: {
    type: String,
    required: true
  },
  publishedDate: Date
}, {timestamps: true});

mongoose.model('Post', postSchema);