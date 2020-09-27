// All Used External Modules
const path = require('path');
const express = require('express');
const envData = require('./middleware/dotenv')();
const sequelize = require('./models/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const uniqueSlug = require('unique-slug');
const logger = require('./middleware/logger');
const helmet = require('helmet');

const app = express();




// All Used External Middlewares

app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// All Routes Declarations

const admin = require('./routes/admin');
const user = require('./routes/user');
const content = require('./routes/content');


// All Used Express Routes


app.use('/word', (req, res, next) => {
    res.json({ msg: "Hello word :)" });
})

app.use('/admin', admin);
app.use('/user', user);
app.use('/content', content);


// All Used Models Declaration

const Product = require('./models/product');
const User = require('./models/user');
const Image = require('./models/image');
const Order = require('./models/order');
const ProdSize = require('./models/prod-size');
const Cart = require('./models/cart');


// All Models Associations

Product.hasMany(Image, {onDelete: 'CASCADE'});
Image.belongsTo(Product);

Product.hasMany(ProdSize, {onDelete: 'CASCADE'});
ProdSize.belongsTo(Product);

User.hasMany(Order, {onDelete: 'CASCADE'});
Order.belongsTo(User);


Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });



// Error Handler Middleware Which Should Executes Last

app.use((error, req, res, next) => {
    const status = error.statusCode || 500; 
    const message = error.message;
    const data = error.data;
    
    logger.error(message, { status: status, data: data || 'empty' });
    res.status(status).json({ message: message, data: data });
});





sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT, () => console.log('Server started on port 3000')); 
    })
    .catch(err => {
        console.log(err);
    });


