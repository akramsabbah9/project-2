const router = require("express").Router();
const sequelize = require("../config/connection");
const { Article } = require("../models");

// front page: get article count

// single article: render a single article

// route user to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("login");
});

module.exports = router;