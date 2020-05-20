const mongoose = require('mongoose');
const {Schema} = mongoose;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  message: {
    type: String,
    required: true,
    index: true
  }
}, {timestamps: true});

mongoose.model('Notification', notificationSchema);

const userNotificationSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
    unique: true
  },
  lastSeen: {
    type: Date,
    required: true,
  },
  fcmToken: String
}, {timestamps: true});
mongoose.model('UserNotification', userNotificationSchema);