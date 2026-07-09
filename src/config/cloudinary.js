const cloudinary = require("cloudinary").v2;
const envVars = require("../config/env.config.js");

cloudinary.config({
    cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;