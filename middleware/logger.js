const winston = require('winston');
const path = require('path');


module.exports = winston.createLogger({
    level: winston.config.syslog.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ maxsize: 1000000, filename: path.join(__dirname, '..', 'logs/error.log'), level: 'error' }),
        new winston.transports.File({ maxsize: 1000000, filename: path.join(__dirname, '..', 'logs/info.log'), level: 'info' }),
        new winston.transports.Console({ 
            level: 'error', 
            format: winston.format.json()
        })
    ],
});


