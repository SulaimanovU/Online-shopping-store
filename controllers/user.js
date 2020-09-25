const { validationResult } = require('express-validator');
const mailgen = require('../middleware/email-template');
const nodemailer = require('nodemailer');
const Cart = require('../models/cart');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.signup = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const hashedPw = await bcrypt.hash(password, 12);
        
        const user = await User.create({
            email: email,
            password: hashedPw
        })
                
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: 'ulansulamaovulan123@gmail.com',
                pass: '123456789ulan$'
            }
        });
        
        let mail = mailgen.client(user);
    
        let message = {
            from: 'The BrandName Account Services',
            to: user.email,
            subject: "Добро пожаловать в BrandName где вы можете купить одежду.",
            html: mail,
        };
    
        const sendEmailResult = await transporter.sendMail(message);
                
        if(sendEmailResult.rejected.length){
            const error = new Error('Internal system error. email could not be send');
            error.statusCode = 500;
            throw error;
        }
        
        res.status(200).json({ msg: "you should receive an email from us" });
    }
    catch(err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        
        const user = await User.findOne({ where: { email: email } })
        
        if(!user){
            const error = new Error('A user with this email could not found.');
            error.statusCode = 404;
            throw error;
        }
        
        if(!user.active){
            
            const error = new Error('A mail of this user is not verificated.');
            error.statusCode = 401;
            throw error;
        }
        
        const isEqual = bcrypt.compare(password, user.password);
        
        if(!isEqual){
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                userId: user.id
            },
            'supersecretusercode',
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token: token });
        
    }
    catch(err) {
        next(err);
    }
    

};


exports.verify = async (req, res, next) => {
    const email = req.query.email;
    const password = req.query.hashedpw;
    
    try {
        const user = await User.findOne({ where: { email: email, password: password } })
        
        user.active = 1;
        await user.save();

        res.redirect('https://cat-bounce.com/');
    }
    catch(err) {
        next(err);
    }
}


exports.getCart = async (req, res, next) => {
    
    const userId = req.userId;
    
    try {
        const carts = await Cart.findAll({ where: { userId: userId } });
        
        res.status(200).json({ carts: carts });
    }
    catch(err) {
        next(err);
    }
}


exports.addCart = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const prodId = req.body.prodId;
    const userId = req.userId;
    
    try {
        const user = await User.findByPk(userId);
        
        const newCartPt = user.createCart({
            productId: prodId
        });
        
        res.status(200).json({ newCartPt: newCartPt });
    }
    catch(err) {
        next(err);
    }   
}


exports.deleteCart = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const cartId = req.body.cartId;
    const userId = req.userId;
    
    try {
        const cart = await Cart.findOne({ where: { id: cartId, userId: userId } });
        
        await cart.destroy();
        
        res.status(200).json({ msg: 'Product successfuly deleted from cart!' });
    }
    catch(err) {
        next(err);
    }
}


exports.setCartNumber = async (req, res, next) => {
    
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const cartId = req.body.cartId;
    const quantity = req.body.quantity;
    const userId = req.userId;
    
    try {
        const cart = await Cart.findOne({ where: { id: cartId, userId: userId } });
        
        cart.quantity = quantity;
        const updatedCartPt = await cart.save();
        
        res.status(200).json({ updatedCartPt: updatedCartPt });
    }
    catch(err) {
        next(err);
    }
}












