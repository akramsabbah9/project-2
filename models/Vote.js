/* Vote.js: sequelize model for Vote table in backend database. */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Vote extends Model {}

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: DataTypes.INTEGER, // 1, 0, or -1
            allowNull: false,
            validate: {
                isIn: [[-1, 0, 1]]
            }
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
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "vote"
    }
);

module.exports = Vote;