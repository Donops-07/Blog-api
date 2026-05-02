const express = require("express");
const { postArticle, getAllArticles, searchArticle, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/article.js")

const router = express.Router();

router.post("/article", postArticle);
router.get("/article", getAllArticles);
router.get("/search", searchArticle);
router.get("/article/:id", getArticleById);
router.put("/article/:id", updateArticleById);
router.delete("/article/:id", deleteArticleById);

module.exports = router;