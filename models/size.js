const Sequelize = require('sequelize');
const sequelize = require('./database');

const size = sequelize.define('size', {
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

module.exports = size;















