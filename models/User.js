// Model for Users' data table
const { Model, DataTypes } = require('sequelize');
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
        unique: true,
        allowNull: false,
        validate: {
            len: [6, 12]

        }
    },
    // We can adjust this as you guys think is best but I thought it would be good to give the values some parameters
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
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