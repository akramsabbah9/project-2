/* Article.js: sequelize model for Article table in backend database. */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Article extends Model {}

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