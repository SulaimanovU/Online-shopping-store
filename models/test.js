const Sequelize = require('sequelize');
const sequelize = require('./database');

const star = sequelize.define('star', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    starsts: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = star;