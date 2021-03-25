const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const articleRoutes = require("./article-routes");

router.use("/", homeRoutes);
router.use("/article", articleRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;