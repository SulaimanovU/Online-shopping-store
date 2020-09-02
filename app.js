// All Used External Modules
const path = require('path');
const express = require('express');
const envData = require('./middleware/dotenv')();
const sequelize = require('./models/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const uniqueSlug = require('unique-slug');
const helmet = require('helmet');

const app = express();




// All Used External Middlewares

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uniqueSlug() + uniqueSlug() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
 

app.use(multer({ storage: storage, fileFilter: fileFilter }).array('myFiles', 12));
app.use(bodyParser.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
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

app.use('/', (req, res, next) => {
    res.json({ msg: "Hello world :)" });
})

app.use('admin', admin);
app.use('user', user);
app.use('content', content);


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