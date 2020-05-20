const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const admin = require("firebase-admin");
const serviceAccount = require("./let-s-publish-firebase-adminsdk-5xskb-727914c07e.json");

admin.initializeApp({
  projectId: "let-s-publish",
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "let-s-publish.appspot.com",
});
const bucket = admin.storage().bucket();

const User = mongoose.model('User');
const v = require('./validation');

const addProfileImageIntoUser = (url) => {
  try {
  } catch (e) {
    throw Error(e);
  }
};

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${Date.now()}_${file.originalname}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

module.exports = (r, m) => {
  r.get('/', async (req, res) => {
    res.send('profile api');
  });

  // authentication & authorization
  // check username & username and create new user then return access & refresh token
  r.post('/register', v.validateBodySchema(v.registerSchema), async (req, res) => {
    try {
      const {username, password} = req.value;
      const newUser = await User.create({username, password});
      res.json({
        access_token: createAccessToken(newUser),
        refresh_token: newUser.refreshToken,
        user: newUser
      });
    } catch (e) {
      res.status(400).json(e);
    }
  });

  // gets access & refresh token
  r.post('/login', v.validateBodySchema(v.loginSchema), async (req, res) => {
    try {
      const {username, password} = req.value;
      const user = await User.findOne({username});
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) throw Error('missing data')
      user.updateRefreshToken(req.get('refresh-token'));
      res.json({
        access_token: createAccessToken(user),
        refresh_token: user.refreshToken,
        user
      });
    } catch (e) {
      console.log(e);
      res.status(401).send({error: "username or password wrong"});
    }
  });

  // check refresh token and return access token
  r.get('/refresh-token', async (req, res) => {
    const user = User.validateRefreshToken(req.get('refresh-token'));
    if (user !== false) {
      return res.json({
        access_token: createAccessToken(user)
      });
    }
    res.status(401).json({
      error: {
        refreshToken: 'refresh-token is invalid'
      }
    })
  });

  // features
  // only admin can get this
  r.get('/all', authenticate, async (req, res) => {
    try {
      if (req.user.isAdmin) {
        const users = await User.find();
        return res.json({users: users});
      }
      throw Error();
    } catch (e) {
      res.status(401).json({
        error: {
          accessToken: 'access-token is invalid'
        }
      })

    }
  });

  // user get own information
  r.get('/self', authenticate, (req, res) => {
    User.findById(req.user.id)
      .then((user) => res.json({user}))
      .catch((e) => res.status(400).send(e));
  });

  // upload profile photo to google
  r.post('/upload-profile', [authenticate, m.single('profile')], (req, res) => {
    console.log('Upload profile');
    let file = req.file;
    if (file) {
      uploadImageToStorage(file).then((url) => {
        User.findByIdAndUpdate(req.user.id, {profile: url})
          .then(() => {
            res.status(200).send({
              url: url,
              status: 'success'
            });
          })
      }).catch((error) => {
        res.status(400).send({
          error: error,
          status: 'failed'
        });
      });
    }
  });

  return r;
};

function authenticate(req, res, next) {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    console.log(token);
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      const decoded = jwt.verify(token, 'secret-access');
      const user = User.findOne(decoded.id);
      if (user == null) throw Error('failed');
      req.user = decoded;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({
      error: {
        accessToken: 'access-token is invalid'
      }
    })
  }
}

function createAccessToken(user) {
  return jwt.sign({
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    images: user._images
  }, 'secret-access');
}