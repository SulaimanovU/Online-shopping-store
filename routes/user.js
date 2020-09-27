const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');
const user = require('../controllers/user');
const router = express.Router();

// AUTHORIZTION *********************************************************
router.put(
    '/signup',
    [
        body('email').isEmail()
            .custom((value, { red }) => {
                return User.findOne({where: {email: value}}).then(userData => {
                    if(userData)  return Promise.reject('Email address already exist');
                })
            }),
        body('password').trim().isLength({ min: 5 })
    ],
    user.signup
);

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').trim().isLength({ min: 5 })
    ],
    user.login
);

router.get('/verify', user.verify);



// COMMENT *********************************************************

router.post(
    '/comment',
    isAuth.user,
    [
        body('name').trim().not().isEmpty(),
        body('star').isFloat({ min: 0, max: 5 }),
        body('text').trim().not().isEmpty()
    ],
    (req, res, next) => {}
);

router.put(
    '/comment',
    isAuth.user,
    [
        body('name').trim().not().isEmpty(),
        body('star').isFloat({ min: 0, max: 5 }),
        body('text').trim().not().isEmpty()
    ],
    (req, res, next) => {}
);


router.delete(
    '/comment', 
    isAuth.user,
    (req, res, next) => {}
);


// CART *********************************************************

router.get(
    '/carts', 
    isAuth.user,
    user.getCart
);


router.post(
    '/cart',
    isAuth.user,
    [
        body('prodId').isInt(),
    ],
    user.addCart
);


router.delete(
    '/cart', 
    isAuth.user,
    user.deleteCart
);


router.put(
    '/cart', 
    isAuth.user,
    [
        body('cartId').isInt(),
        body('quantity').isInt({ min: 2 })
    ],
    user.setCartNumber
);


router.post(
    '/checkout',
    isAuth.user,
    [
        body('firstName').trim().not().isEmpty(),
        body('lastName').trim().not().isEmpty(),
        body('productName').trim().not().isEmpty(),
        body('quantity').isInt({ min: 1 }),
        body('price').isInt(),
        body('discount').isInt(),
        body('payService').isIn(['visa', 'paypal']),
        body('cartNumber').trim().not().isEmpty()
    ],
    user.checkOut
);


module.exports = router;













