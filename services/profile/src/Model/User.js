const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profile: String,
  refreshToken: String
}, {timestamps: true});

userSchema.toJSON = function (user) {
  console.log(user);
  return user;
};

userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.addRefreshToken();
    user.password = hash;
    next();
  })
});

userSchema.methods.addRefreshToken = function () {
  const user = this;
  user.refreshToken = jwt.sign({
    id: user._id,
  }, 'secret-refresh');
};

userSchema.methods.updateRefreshToken = function (refreshToken) {
  const user = this;
  try {
    if (user.refreshToken !== refreshToken) return;
    const decoded = jwt.verify(refreshToken, 'secret-refresh');
    if (user._id.toString() === decoded.id) {
      if (Math.ceil(Math.abs(new Date().getTime() - decoded.iat * 1000) / (1000 * 60 * 60 * 24)) >= 10)
        user.addRefreshToken();
    }
  } catch (err) {
    user.refreshToken = null;
  }
}

userSchema.statics.validateRefreshToken = function (refreshToken) {
  const User = this;
  try {
    const decoded = jwt.verify(refreshToken, 'secret-refresh');
    const user = User.findOne(decoded.id);
    if (user == null) return false;
    return user;
  } catch (e) {
    return false;
  }
}

mongoose.model('User', userSchema);