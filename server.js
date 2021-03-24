/* IMPORTS */
require('dotenv').config();

const express = require("express");
const session = require('express-session');
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require("./utils/helpers");



/* SETUP AND MIDDLEWARE */
const sess = {
    secret: process.env.SECRET, // use dotenv to protect your secret'
    cookie: { maxAge: 30 * 60 * 1000 }, // maxAge -> 30 mins
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));
app.use(routes);





/* BEGIN SERVER */
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});