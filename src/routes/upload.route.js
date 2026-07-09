const express = require("express");
const upload = require("../middlewares/upload.js");
const uploadMedia = require("../controllers/upload.controller.js");
const mediaRoute = express.Router();

mediaRoute.post("/upload", upload.single("file"), uploadMedia);

module.exports = mediaRoute;
