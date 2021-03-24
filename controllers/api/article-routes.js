/* routes for articles in backend api */
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Article, Comment, Image, Revision, Vote } = require("../../models");
const { checkVote } = require("../../utils/middleware");

// get all articles
router.get("/", (req, res) => {
    Article.findAll({
        //TODO: maybe remove content from output for findAll route? Might be too big 
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
            // all comments on each article
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
    .then(articleData => res.json(articleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// get one article by id
router.get("/:id", (req, res) => {
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// post a new article
// TODO: maybe add the newly-created article to the revision table when it is made?
router.post("/", (req, res) => {
    // expects { title, content } in req.body
    Article.create({
        title: req.body.title,
        content: req.body.content
    })
    .then(articleData => res.json(articleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// (put) vote on an article by id
router.put("/vote", checkVote, (req, res) => {
    // expects { value, user_id, article_id } in req.body
    if (req.session) {
        Article.vote(
            { ...req.body, user_id: req.session.user_id },
            {Vote, Comment, User, Image, Revision }
        )
        .then(articleData => res.json(articleData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});


// (put) update an article by id
// TODO: maybe interface with the revision table, as done in votes?
router.put("/:id", (req, res) => {
    // expects { title, content } in req.body
    Article.update(
    {
        title: req.body.title,
        content: req.body.content
    },
    {
        where: { id: req.params.id }
    })
    .then(articleData => {
        if (!articleData[0]) {
            return res.status(404).json({ message: "No article found with this id" });
        }
        res.json(articleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// delete an article by id
router.delete("/:id", (req, res) => {
    Article.destroy({
        where: { id: req.params.id }
    })
    .then(articleData => {
        if (!articleData) {
            return res.status(404).json({ message: "No article found with this id" });
        }
        res.json(articleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;