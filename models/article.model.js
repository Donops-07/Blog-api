const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        minLength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;