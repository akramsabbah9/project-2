const lunr = require("lunr");
const router = require("express").Router();
const {
    QueryTypes
} = require("sequelize");
const sequelize = require("../config/connection");
const {
    User,
    Article,
    Comment,
    Image,
    Revision
} = require("../models");



// front page: get article count and display it
router.get("/", (req, res) => {
    sequelize.query(
            "SELECT COUNT(*) AS `article_count` FROM article", {
                type: QueryTypes.SELECT
            }
        )
        .then(counterData => {
            // serialize data and render homepage
            const count = counterData[0].article_count;

            res.render("homepage", {
                count,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/search/", (req, res) => {
    return res.redirect("/");
});

router.get("/search/:searchTerm", (req, res) => {
    let searchTerm = req.params.searchTerm;
    searchTerm = `*${searchTerm}*`;
    Article.findAll()
        .then(searchData => {
            if (!searchData) {
                return res.status(404).json({
                    message: "No articles Found"
                });
            }

            let articles = searchData.map(article => article.get({
                plain: true
            }));
            const idx = lunr(function() {
                this.field("title");
                this.field("content");

                for (let i = 0; i < articles.length; i++) {
                    this.add(articles[i])
                }
            });

            function searchArticles(index, query, artArray) {
                const output = index.search(query);
                let ret = artArray.filter(article => output.find(item => parseInt(item.ref) === article.id));
                return ret;
            }

            const result = searchArticles(idx, searchTerm, articles)
            console.log(result);

            res.render("search-result", {
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
                return res.status(404).json({
                    message: "No articles have been created yet"
                });
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

// render a single revision
router.get("/revision/:id", (req, res) => {
    Revision.findOne({
            where: {
                id: req.params.id
            },
            attributes: ["id", "changes", "user_id", "created_at", "updated_at"],
            include: [{
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Article,
                    attributes: ["id", "title"]
                }
            ]
        })
        .then(revisionData => {
            if (!revisionData) {
                return res.status(404).json({
                    message: "No article found with this id"
                });
            }
            // serialize data and render homepage
            const revision = revisionData.get({
                plain: true
            });
            console.log(revision);

            res.render("single-article-history", {
                revision,
                loggedIn: req.session.loggedIn
            });
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

// route user to signup page
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("signup");
});

module.exports = router;