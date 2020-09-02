const Sequelize = require('sequelize');
const sequelize = require('./database');

const comment = sequelize.define('comment', {
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
    star: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    active: {
        type: Sequelize.STRING,
        defaultValue: false
    }
});

module.exports = comment;















