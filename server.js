/* IMPORTS */
require('dotenv').config();

const express = require("express");
const session = require('express-session');

const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);



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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));
app.use(routes);





/* BEGIN SERVER */
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});