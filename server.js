/* IMPORTS */
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");


/* SETUP AND MIDDLEWARE */
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

/* BEGIN SERVER */
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});