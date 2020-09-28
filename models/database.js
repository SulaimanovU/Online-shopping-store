const Sequelize = require('sequelize');
const logger = require('../middleware/logger');


const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

/*const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: msg => logger.info(msg),
	mysql://root:keiz@localhost:3306/online_shop
});*/


module.exports = sequelize;
