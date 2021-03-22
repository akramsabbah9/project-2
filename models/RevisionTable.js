const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RevisionTable extends Model {}


RevisionTable.init({

    edited_content: {
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
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
});

module.exports = RevisionTable;