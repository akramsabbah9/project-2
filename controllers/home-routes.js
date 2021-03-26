const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { User, Article, Comment, Image, Revision } = require("../models");



// front page: get article count and display it
router.get("/", (req, res) => {
    sequelize.query(
            "SELECT COUNT(*) AS `article_count` FROM article", { type: QueryTypes.SELECT }
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


// render the new-article page
router.get("/article/create", (req, res) => {
    // if (!req.session.loggedIn) { //TODO: remove when withAuth added
    //     return res.redirect("/");
    // }

    res.render("new-article", { loggedIn: req.session.loggedIn });
});


// route user to a random article
router.get("/random", (req, res) => {
    Article.findAll({
            order: sequelize.literal("RAND()"),
            limit: 1
        })
        .then(articleData => {
            // if the results are empty (no articles, respond with 404)
            if (!articleData) {
                return res.status(404).json({ message: "No articles have been created yet" });
            }
            // res.json(articleData);
            // get id from article data and redirect user to that endpoint
            const article_id = articleData[0].id;

            res.redirect(`/article/${article_id}`);

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
            // serialize data and render homepage
            const article = articleData.get({ plain: true });

            res.render("single-article", { article, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// render the new-article page
router.get("/article/:id/edit", (req, res) => {
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
            //res.json(articleData);
            // serialize data and render homepage
            const article = articleData.get({ plain: true });

            res.render("edit-article", { article, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// render an article's revision history
router.get("/article/:id/history", (req, res) => {
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

router.get('/search', (req, res) => {
    res.render('search');
});


// route user to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("login");
});

// route user to signup page
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("signup");
});

module.exports = router;