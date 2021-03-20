// const User = require("./User");
const Article = require("./Article");
const Comment = require("./Comment");
// const Source = require("./Source");
// const Image = require("./Image");
// const Edit = require("./Edit");
const Vote = require("./Vote");

// TODO: define model relationships here
Article.hasMany(Comment, {
    foreignKey: "article_id"
});

Comment.belongsTo(Article, {
    foreignKey: "article_id"
});

Article.hasMany(Vote, {
    foreignKey: "article_id"
});

Vote.belongsTo(Article, {
    foreignKey: "article_id"
});

module.exports = {Article, Comment, Vote};
// module.exports = { User, Article, Comment, Source, Image, Edit, Vote };