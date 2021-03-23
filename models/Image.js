// Model for image table
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isUrl: true,
        }
    },
    article_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'article',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'image'
});

module.exports = Image;