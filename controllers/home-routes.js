const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { User, Article, Comment, Image, Revision } = require("../models");

// front page: get article count and display it
router.get("/", (req, res) => {
    sequelize.query(
        "SELECT COUNT(*) AS `article_count` FROM article",
        { type: QueryTypes.SELECT }
    )
    .then(counterData => {
        // serialize data and render homepage
        const count = counterData[0].article_count;

        res.render("homepage", { count, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// single article: render a single article
// TODO: instead of doing this by id, use the article name separated by underscores
router.get("/article/:id", (req, res) => {
    Article.findOne({
        where: { id: req.params.id },
        attributes: [
            "id", "title", "content", "created_at", "updated_at",
            [
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
        res.json(articleData);
        // serialize data and render homepage
        // const article = articleData.get({ plain: true });

        // res.render("single-article", { article, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// route user to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("login");
});

module.exports = router;