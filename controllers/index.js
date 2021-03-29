// index for the various routes

const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const pageRoutes = require("./page-routes");

router.use("/", homeRoutes);
router.use("/article", pageRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;