/* Vote.js: sequelize model for Vote table in backend database. */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Vote extends Model {}

Vote.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.BOOLEAN, // true for upvote, false for downvote
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "article",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "vote"
});

module.exports = Vote;