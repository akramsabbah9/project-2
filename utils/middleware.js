/* middleware.js: middleware to help with routing. */
const { Vote } = require("../models");

// checks if a Vote (value, user_id, article_id) has already been made.
// if there's already a duplicate vote in the database, ignore the new one.
// if the user_id and article_id are the same, but not the value, then
//   change the existing vote to have the new value.
const checkVote = (req, res, next) => {
    Vote.findOne({
            where: {
                user_id: req.body.user_id,
                article_id: req.body.article_id
            }
        })
        .then(voteData => {
            // if the vote has no duplicate, continue.
            if (!voteData) {
                next();
            }
            // if there is a dupe with the same value, respond with 400.
            else if (voteData.dataValues.value === req.body.value) {
                res.status(400).json({ message: "You already voted on this article." });
            }
            // if there is a dupe with a different value, update it.
            else {
                Vote.update({
                        value: req.body.value
                    }, {
                        where: {
                            user_id: voteData.dataValues.user_id,
                            article_id: voteData.dataValues.article_id
                        }
                    })
                    .then(updateData => {
                        if (!updateData[0]) {
                            return res.status(400).json({ message: "Could not change vote" });
                        }
                        res.json(updateData);
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

// TODO: for use after we start working with sessions.
// const withAuth = (req, res, next) => {
//     if (!req.session.user_id) {
//         res.redirect("/login");
//     }
//     else {
//         next();
//     }
// };

module.exports = { checkVote }; //{ checkVote, withAuth };