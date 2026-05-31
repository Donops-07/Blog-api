const Joi = require("joi");
const ArticleModel = require("../models/article.model")

const postArticle = async (req, res, next) => {
    try {
        const articleSchema = Joi.object({
            title: Joi.string().trim().min(3).max(30).required(),
            content: Joi.string().trim().min(20).required()
        });

        const { error, value } = articleSchema.validate(req.body);
        if (error) return res.status(400).json({
            error: "There's an error from the json sent"
        });

        const newArticle = ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body._id
        });
        await newArticle.save();
        return res.status(201).json({
            message: "New post created",
            newArticle
        });

    } catch (error) {
        console.error(error);
        next(error);
    };
};

const getAllArticles = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        if (parseInt(limit) > 20) return res.status(400).json({ error: "Limit should be lower" });
        const skip = (page - 1) * limit;
        const gettingArticles = await ArticleModel.find({})
            .sort({ createdAt: - 1 })
            .skip(skip)
            .limit(limit);
        return res.status(200).json({ gettingArticles });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

const searchArticle = async (req, res, next) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: "Search keyword is required." });
    }
    const article = await ArticleModel.find({
        title: { $regex: keyword, $options: 'i' }
    })
    return res.status(200).json({ message: article });
};

const getArticleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const articles = await ArticleModel.findById(id);
        if (!articles) return res.status(404).json({ error: "Article not found" });
        return res.status(200).json({ message: "Article found", articles });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

const updateArticleById = async (req, res, next) => {
    try {
        const articleSchema = Joi.object({
            title: Joi.string().trim().min(3).optional(),
            content: Joi.string().trim().min(20).optional(),
            author: Joi.string().optional()
        });

        const { error, value } = articleSchema.validate(req.body);
        if (error) return res.status(400).json({
            error: "Unable to update article"
        });
        const id = req.params.id;
        const changeArticle = await ArticleModel.findByIdAndUpdate(id,
            { ...req.body },
            {
                new: true,
                runValidators: true
            }
        );
        if (!changeArticle) return res.status(404).json({ error: "Article not found" });
        return res.status(200).json({
            message: "Article successfully updated",
            changeArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

const deleteArticleById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const articleToDelete = await ArticleModel.findByIdAndDelete(id);
        if (!articleToDelete) return res.status(400).json({ error: "Article not found" });
        return res.status(204).json({ message: "Article deleted" });
    } catch (error) {
        console.error(error);
        next(error);
    };
};

module.exports = {
    postArticle,
    getAllArticles,
    searchArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
}