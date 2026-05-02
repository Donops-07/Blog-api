require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDB.js");
const logRequest = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");
const Router = require("./routes/article.route.js");
const { postArticle, getAllArticles, searchArticle, getArticleById, updateArticleById, deleteArticleById } = require("./controllers/article.js");
const app = express();

const PORT = process.env.PORT;

connectDB();
app.use(express.json());
app.use(cors("*"));
app.use(logRequest);
app.use("/api", Router);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is connected on http://localhost:${PORT}`);
});
