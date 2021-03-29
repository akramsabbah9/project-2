// Model for Users' data table
const {
    Model,
    DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


// Uses bcrypt to conceal passwords
class User extends Model {
    passwordCheck(currentPassword) {
        return bcrypt.compareSync(currentPassword, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 18] // username must be between 4 and 12 characters long

        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8] // password must be 8 characters long
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }

}, {
    hooks: {
        // Using hooks with bcrypt
        async beforeCreate(newData) {
            newData.password = await bcrypt.hash(newData.password, 10);
            return newData;
        },

        async beforeUpdate(updatedData) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
            return updatedData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

module.exports = User;