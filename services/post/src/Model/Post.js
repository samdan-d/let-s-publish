const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  _user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _category: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _tags: [Schema.Types.ObjectId],
  _image: Schema.Types.ObjectId,
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