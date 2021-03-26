const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { User, Article, Comment, Image, Revision } = require("../models");
const withAuth = require("../utils/auth");

// render the new-article page
router.get("/create", withAuth, (req, res) => {

    res.render("new-article", { loggedIn: req.session.loggedIn });
});

// single article: render a single article
// TODO: instead of doing this by id, use the article name separated by underscores
router.get("/:id", (req, res) => {
    Article.findOne({
            where: { id: req.params.id },
            attributes: [
                "id", "title", "content", "created_at", "updated_at", [
                    sequelize.literal(
                        "(SELECT SUM(value) FROM vote WHERE article.id = vote.article_id)"
                    ),
                    "vote_count"
                ]
            ],
            include: [
                // all comments on this article
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "article_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
                // all images used by this article
                {
                    model: Image,
                    attributes: ["id", "image_url"]
                },
                // all revisions to this article
                {
                    model: Revision,
                    attributes: ["id", "changes"]
                }
            ]
        })
        .then(articleData => {
            if (!articleData) {
                return res.status(404).json({ message: "No article found with this id" });
            }
            // serialize data and render single-article
            const article = articleData.get({ plain: true });

            res.render("single-article", { article, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// render the new-article page
router.get("/:id/edit", (req, res) => {
    Article.findOne({
            where: { id: req.params.id },
            attributes: [
                "id", "title", "content", "created_at", "updated_at", [
                    sequelize.literal(
                        "(SELECT SUM(value) FROM vote WHERE article.id = vote.article_id)"
                    ),
                    "vote_count"
                ]
            ],
            include: [
                // all comments on this article
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "user_id", "article_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"]
                    }
                },
                // all images used by this article
                {
                    model: Image,
                    attributes: ["id", "image_url"]
                }
            ]
        })
        .then(articleData => {
            if (!articleData) {
                return res.status(404).json({ message: "No article found with this id" });
            }
            // serialize data and render edit-article
            const article = articleData.get({ plain: true });

            res.render("edit-article", { article, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// render an article's revision history
router.get("/:id/history", (req, res) => {
    Revision.findAll({
            where: { article_id: req.params.id },
            attributes: ["id", "user_id", "created_at", "updated_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: {
                model: User,
                attributes: ["username"]
            }
        })
        .then(revisionData => {
            // serialize data and render article-history
            const history = revisionData.map(revision => revision.get({ plain: true }));

            res.render("article-history", { history, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;