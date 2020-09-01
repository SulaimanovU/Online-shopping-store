// All Used External Modules
const express = require('express');
const envData = require('./middleware/dotenv')();
const sequelize = require('./models/database');
const app = express();







// Some code











sequelize
    .sync({force: true})
    .then(result => {
        app.listen(process.env.PORT, () => console.log('Server started on port 3000')); 
    })
    .catch(err => {
        console.log(err);
    });