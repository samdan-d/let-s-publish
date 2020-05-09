const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: String
});

mongoose.model('Image', imageSchema);