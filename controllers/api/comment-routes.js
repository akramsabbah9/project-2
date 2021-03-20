/* routes for comments in backend api */
const router = require("express").Router();
const { Comment } = require("../../models");

// get all comments
router.get("/", (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// get one comment by id
router.get("/:id", (req, res) => {
    Comment.findOne({
        where: { id: req.params.id }
    })
    .then(commentData => {
        if (!commentData) {
            return res.status(404).json({ message: "No comment found with this id" });
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// post a new comment
router.post("/", (req, res) => {
    // expects { comment_text, user_id, article_id } in req.body
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        article_id: req.body.article_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// put/edit a comment's text by id
router.put("/:id", (req, res) => {
    // expects { comment_text } in req.body
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: { id: req.params.id }
        }
    )
    .then(commentData => {
        if (!commentData[0]) {
            return res.status(404).json({ message: "No comment found with this id" });
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// delete a comment by id
router.delete("/:id", (req, res) => {
    Comment.destroy({
        where: { id: req.params.id }
    })
    .then(commentData => {
        if (!commentData) {
            return res.status(404).json({ message: "No comment found with this id" });
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;