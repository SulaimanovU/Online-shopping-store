const Sequelize = require('sequelize');
const sequelize = require('./database');

const product = sequelize.define('product', {
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
        defaultValue: 0
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    composition: {
        type: Sequelize.STRING,
        allowNull: false
    },
    season: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assurance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    madein: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    buycount: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
});

module.exports = product;















