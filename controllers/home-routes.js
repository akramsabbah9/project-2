const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { Article } = require("../models");

// front page: get article count and display it
router.get("/", (req, res) => {
    sequelize.query("SELECT COUNT(*) FROM article", { type: QueryTypes.SELECT })
    .then(counterData => {
        res.json(counterData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// single article: render a single article

// route user to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("login");
});

module.exports = router;