// All Used External Modules
const express = require('express');
const envData = require('./middleware/dotenv')();
const sequelize = require('./models/database');
const app = express();





// All Routes Declarations




// All Used Express Routes



// All Used Models Declaration

const Product = require('./models/product');
const User = require('./models/user');
const Comment = require('./models/comment');
const Image = require('./models/image');
const Size = require('./models/size');
const Color = require('./models/color');
const Order = require('./models/order');
const Reply = require('./models/reply');

// All Models Associations

Product.hasMany(Image, {onDelete: 'CASCADE'});
Image.belongsTo(Product);

Product.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(Product);

Product.hasMany(Order, {onDelete: 'CASCADE'});
Order.belongsTo(Product);

User.hasMany(Comment, {onDelete: 'CASCADE'});
Comment.belongsTo(User);

User.hasMany(Order, {onDelete: 'CASCADE'});
Order.belongsTo(User);

Comment.hasOne(Reply, {onDelete: 'CASCADE'});
Reply.belongsTo(Comment);

Product.belongsToMany(Size, { through: 'prodsizes' });
Size.belongsToMany(Product, { through: 'prodsizes' });

Product.belongsToMany(Color, { through: 'prodcolors' });
Color.belongsToMany(Product, { through: 'prodcolors' });

Product.belongsToMany(User, { through: 'carts' });
User.belongsToMany(Product, { through: 'carts' });


// Error Handler Middleware Which Should Executes Last












sequelize
    .sync()
    .then(result => {
        app.listen(process.env.PORT, () => console.log('Server started on port 3000')); 
    })
    .catch(err => {
        console.log(err);
    });