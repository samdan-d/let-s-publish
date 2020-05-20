const mongoose = require('mongoose');

const Notification = mongoose.model('Notification');
const UserNotification = mongoose.model('UserNotification');

module.exports = (r) => {
  r.post('/set-fcm-token', async (req, res) => {
    const fcmToken = req.body.fcmToken;
    if (!fcmToken) return res.status(400).json({error: 'fcmToken is required'});

    try {
      const _user = req.user.id;
      let userNotification = await UserNotification.findOne({_user});
      if (userNotification == null) {
        userNotification = new UserNotification({_user, fcmToken, lastSeen: new Date()});
        await userNotification.save();
      } else {
        if (userNotification.fcmToken !== fcmToken) {
          userNotification.fcmToken = fcmToken;
          await userNotification.update();
        }
      }
      res.json({userNotification});
    } catch (e) {
      res.status(400).json({error: e});
    }
  });

  r.put('/seen', async (req, res) => {
    try {
      const _user = req.user.id;
      let userNotification = await UserNotification.findOneAndUpdate({_user}, {lastSeen: new Date()});
      if (userNotification == null) return res.status(400).json({error: 'not found ho'});
      res.json();
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e});
    }
  });

  r.get('/', async (req, res) => {
    try {
      const _user = req.user.id;
      const userNotification = await UserNotification.findOne({_user});
      if (userNotification == null) return res.status(400).json({error: 'not found ho'});
      const {lastSeen} = userNotification;
      const notifications = await Notification.find({createdAt: {$gt: lastSeen}});
      res.json(notifications);
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e});
    }
  });
  r.post('/', async (req, res) => {
    const {title, message} = req.body;
    if (!title || !message) return res.status(400).json({error: 'title and message are required'});

    try {
      const notification = await Notification.create({title, message});
      // fcm send
      res.json(notification);
    } catch (e) {
      console.log(e);
      res.status(400).json({error: e});
    }
  });
  return r;
};