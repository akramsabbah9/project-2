/* Article.js: sequelize model for Article table in backend database. */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Article extends Model {
    // TODO: can we get rid of the models in this function?
    static vote(body, models) {
        return models.Vote.create({
            value: body.value,
            user_id: body.user_id,
            article_id: body.article_id
        })
        // TODO: do we really need to do a findOne search in Article table if we won't use its output?
        .then(() => {
            return Article.findOne({
                where: { id: body.post_id },
                attributes: [
                    "id", "title", "content", "created_at", "updated_at",
                    [
                        sequelize.literal(
                            // TODO: test if this actually works
                            "(SELECT SUM(value) FROM vote WHERE article.id = vote.article_id)"
                        ),
                        "vote_count"
                    ]
                ],
                include: [
                    // all comments on this article
                    {
                        model: Comment,
                        include: {
                            model: User,
                            attributes: ["username"]
                        }
                    },
                    // TODO: all images used by this article
                    // {
                    //     model: Image,
                    //     attributes: //TODO
                    // },
                    // TODO: all sources used by this article
                    // {
                    //     model: Source,
                    //     attributes: //TODO
                    // },
                    // TODO: include edit history of this article?
                    // {
                    //     model: Edit,
                    //     attributes: //TODO
                    // }
                ]
            });
        });
    }
}

Article.init(
    {
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
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "article"
    }
);

module.exports = Article;