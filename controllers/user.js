const { validationResult } = require('express-validator');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');



exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            return clientUser.create({
                email: email,
                name: name,
                password: hashedPw
            });
        })
        .then(result => {
            if(!result){
                const error = new Error('Client user data does not saved in database.');
                error.statusCode = 500;
                throw error;
            }
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                auth: {
                    user: 'ulansulamaovulan123@gmail.com',
                    pass: '123456789ulan$'
                }
            });
            
            
            let mail = mailgen.client(result);
        
            let message = {
                from: 'The Toi-Ber Account Services',
                to: result.email,
                subject: "Добро пожаловать в Toi-Ber.kg где вы можете найти все что нужно для вашего торжества.",
                html: mail,
            };
        
            return transporter.sendMail(message);
            
        })
        .then(result => {
            if(result.rejected.length){
                const error = new Error('Internal system error. email could not be send');
                error.statusCode = 500;
                throw error;
            }
            res.status(200).json({ msg: "you should receive an email from us" });
        })
        .catch(err => {
            err.statusCode = 500;
            next(err);
        })
    
};


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    
    clientUser.findOne({ where: { email: email } })
        .then(user => {
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
            
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
        
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id
                },
                'secretcodeclient',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.id });
        })
        .catch(err => {
            next(err);
        })
};



exports.verify = (req, res, next) => {
    const email = req.query.email;
    const name = req.query.name;
    const password = req.query.hashedpw;
    
    clientUser.findOne({ where: { email: email, password: password } })
        .then(account => {
            account.active = 1;
            account.save();
        })
        .then(() => {
            res.redirect('https://cat-bounce.com/');
        })
        .catch(err => {
            if(err){
                const error = new Error('Oops something went wrong, try again after a few minut..');
                error.statusCode = 404;
                next(error);
            }
            
        });
}