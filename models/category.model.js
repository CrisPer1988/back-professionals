const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Category = db.define('categories', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    professional_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("active", "disable"),
        defaultValue: "active",
        allowNull: false
    }
});

module.exports = Category;