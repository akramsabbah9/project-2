const router = require("express").Router();

const articleRoutes = require("./article-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");
const revisionRoutes = require("./revision-routes");
const imageRoutes = require("./image-routes");

router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/revisions", revisionRoutes);
router.use("/images", imageRoutes);

module.exports = router;