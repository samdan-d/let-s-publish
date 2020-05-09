const mongoose = require('mongoose');
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  _user: Schema.Types.ObjectId
}, {timestamps: true});

mongoose.model('Tag', tagSchema);