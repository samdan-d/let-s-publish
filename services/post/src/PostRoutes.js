const mongoose = require('mongoose');
const admin = require("firebase-admin");
const serviceAccount = require("./let-s-publish-firebase-adminsdk-5xskb-727914c07e.json");

admin.initializeApp({
  projectId: "let-s-publish",
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "let-s-publish.appspot.com",
});
const bucket = admin.storage().bucket();

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

const Post = mongoose.model('Post');
const Category = mongoose.model('Category');
const Tag = mongoose.model('Tag');

module.exports = (r, m) => {
  r.post('/', (req, res) => {
    if (req.user.isAdmin) {
      Post.create({
        _user: req.user.id,
        ...req.body
      })
        .then((post) => res.json({post}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'must be admin'})
    }
  });

  // upload profile photo to google
  r.post('/upload-image/:id', [m.single('image')], (req, res) => {
    const id = req.params.id;
    console.log('Upload image into post ' + id);
    let file = req.file;
    if (file) {
      uploadImageToStorage(file).then((url) => {
        Post.findByIdAndUpdate(id, {image: url})
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

  r.put('/:id', (req, res) => {
    if (req.user.isAdmin && req.params.id) {
      Post.findByIdAndUpdate(req.params.id, {
        _user: req.user.id,
        ...req.body
      })
        .then((post) => res.json({post}))
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'must be admin or valid id'})
    }
  });

  r.delete('/:id', (req, res) => {
    if (req.user.isAdmin && req.params.id) {
      Post.findByIdAndRemove(req.params.id)
        .then((post) => {
          if (post)
            res.json({post})
          else
            res.status(404).json({error: 'not found'})
        })
        .catch((error) => res.status(400).json({error}));
    } else {
      res.status(400).json({error: 'login or give all info'})
    }
  });

  r.get('/:id', (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (post)
          res.json({post})
        else
          res.status(404).json({error: 'not found'})
      })
      .catch((error) => res.status(400).json({error}));
  });

  r.get('/', async (req, res) => {
    try {
      const posts = await Post.find()
      const categories = await Category.find();
      const tags = await Tag.find()

      res.json({posts, categories, tags});
    } catch (error) {
      console.log(error);
      res.status(400).json({error})
    }
  });

  return r;
};