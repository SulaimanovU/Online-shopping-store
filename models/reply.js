const Sequelize = require('sequelize');
const sequelize = require('./database');

const reply = sequelize.define('reply', {
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
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = reply;















