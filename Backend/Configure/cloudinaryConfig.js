// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'imagehub123',
  api_key: '629621767252672',
  api_secret: 'iM9dlvb4QY82P12ELIjhCWFh9dk',
});

module.exports = cloudinary;
