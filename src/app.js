const express = require("express");
const cors = require("cors");
const logRequest = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const Router = require("./routes/article.route.js");
const route = require("./routes/user.route.js");
const mediaRoute = require("./routes/upload.route.js");
const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(logRequest);
app.use("/api", Router);
app.use("/api/user", route);
app.use("/api/file", mediaRoute);

app.use(errorHandler);

module.exports = app;