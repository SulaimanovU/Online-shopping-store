const Sequelize = require('sequelize');
const sequelize = require('./database');

const color = sequelize.define('color', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    colorName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = color;















