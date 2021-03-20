const router = require("express").Router();
const articleRoutes = require("./article-routes");
const commentRoutes = require("./comment-routes");

router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);

module.exports = router;