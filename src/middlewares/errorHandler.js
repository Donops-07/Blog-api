const { MulterError } = require("multer");

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack || " ");
    const status = err.status || 500;
    res.status(status).json({ error: err.message });

    if (error instanceof MulterError) {
        res.status(400).json({ error: "File not compatible" });
    };
};

module.exports = errorHandler;