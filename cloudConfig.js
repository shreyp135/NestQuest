const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//configuration for cloudinary
cloudinary.config({
        cloud_name : process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
});

//for storing pictures in the cloudinary platform
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "NestQuest",
      allowedFormats:["png","jpg","jpeg"],
    },
  });

  module.exports={
    cloudinary,
    storage,
  }