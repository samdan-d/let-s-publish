const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  _user: Schema.Types.ObjectId
}, {timestamps: true});

mongoose.model('Category', categorySchema);