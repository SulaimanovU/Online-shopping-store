const Sequelize = require('sequelize');
const sequelize = require('./database');

const cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = cart;