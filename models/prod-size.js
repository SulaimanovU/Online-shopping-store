const Sequelize = require('sequelize');
const sequelize = require('./database');

const prodSize = sequelize.define('prodSize', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = prodSize;

