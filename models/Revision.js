// Model for Revision Tables - holds the history of an article's edited content
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Revision extends Model {}


Revision.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    changes: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'article',
            key: 'id'
        }
    },

}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'revision'
});

module.exports = Revision;