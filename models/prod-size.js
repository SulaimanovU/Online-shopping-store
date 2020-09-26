const Sequelize = require('sequelize');
const sequelize = require('./database');

const prodSize = sequelize.define('prodSize', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rus: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    usa: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = prodSize;

