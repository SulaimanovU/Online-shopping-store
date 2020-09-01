const Sequelize = require('sequelize');
const sequelize = require('./database');

const image = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isMain: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = image;















