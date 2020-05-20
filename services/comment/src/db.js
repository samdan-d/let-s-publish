const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect('mongodb://mongodb:27017/comment', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
};
