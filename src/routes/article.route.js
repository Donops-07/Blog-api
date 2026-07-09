const express = require("express");
const { postArticle, getAllArticles, searchArticle, getArticleById, updateArticleById, deleteArticleById } = require("../controllers/article.js")
const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.post("/article", requireAuth, postArticle);
router.get("/article", requireAuth, getAllArticles);
router.get("/search", requireAuth, searchArticle);
router.get("/article/:id", requireAuth, getArticleById);
router.put("/article/:id", requireAuth, updateArticleById);
router.delete("/article/:id", requireAuth, deleteArticleById);

module.exports = router;