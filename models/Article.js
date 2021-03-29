/* Article.js: sequelize model for Article table in backend database. */
const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/connection");

class Article extends Model {
    static vote(body, models) {
        return models.Vote.create({
                value: body.value,
                user_id: body.user_id,
                article_id: body.article_id
            })
            .then(() => {
                return Article.findOne({
                    where: {
                        id: body.article_id
                    },
                    attributes: [
                        "id", "title", "content", "created_at", "updated_at", [
                            sequelize.literal(
                                "(SELECT SUM(value) FROM vote WHERE article.id = vote.article_id)"
                            ),
                            "vote_count"
                        ]
                    ],
                    include: [
                        // all comments on this article
                        {
                            model: models.User,
                            attributes: ["username"]
                        },
                        {
                            model: models.Comment,
                            attributes: ["id", "comment_text", "user_id", "article_id", "created_at"],
                            include: {
                                model: models.User,
                                attributes: ["username"]
                            }
                        },
                        // all images used by this article
                        {
                            model: models.Image,
                            attributes: ["id", "image_url"]
                        },
                        // all revisions to this article
                        {
                            model: models.Revision,
                            attributes: ["id", "changes"]
                        }
                    ]
                });
            });
    }
}

Article.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT("medium"),
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "article"
});

module.exports = Article;