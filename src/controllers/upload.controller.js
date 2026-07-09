const upload = require("../middlewares/upload.js");
const cloudinary = require("cloudinary").v2;

const uploadMedia = ((req, res, next) => {
    try {
        const file = req.file.buffer;

        const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_assets" },
            (error, result) => {
                if (error) return next(error);

                console.log("url:", result.secure_url);
                res.json({ url: result.secure_url });
            }
        );

        stream.end(req.file.buffer);

    } catch (error) {
        next(error);
    }
});

module.exports = uploadMedia;