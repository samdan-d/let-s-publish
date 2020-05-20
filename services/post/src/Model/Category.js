const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  }
}, {timestamps: true});

mongoose.model('Category', categorySchema);