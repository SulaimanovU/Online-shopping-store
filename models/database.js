const Sequelize = require('sequelize');
const logger = require('../middleware/logger');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: msg => logger.info(msg),
});


module.exports = sequelize;
