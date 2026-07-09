const multer = require("multer");
const cloudinary = require("../config/cloudinary.js");

const storage = multer.memoryStorage();


const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});

module.exports = upload;