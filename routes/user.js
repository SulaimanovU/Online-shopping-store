const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const User = require('../models/user');
const router = express.Router();

// AUTHORIZTION *********************************************************
router.put(
    '/signup',
    [
        body('email').isEmail()
            .custom((value, { red }) => {
                return User.findOne({where: {email: value}}).then(userData => {
                    if(userData) return Promise.reject('Email address already exist');
                })
            }),
        body('password').trim().not().isEmpty()
    ],
    (req, res, next) => {}
);

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').trim().not().isEmpty()
    ],
    (req, res, next) => {}
);

router.get('/verify', (req, res, next) => {});














// COMMENT *********************************************************

router.post(
    '/comment',
    isAuth.user,
    [
        body('name').trim().not().isEmpty(),
        body('star').isFloat({ min: 0, max: 5 }),
        body('text').trim().not().isEmpty(),
    ],
    (req, res, next) => {}
);

router.put(
    '/comment',
    isAuth.user,
    [
        body('name').trim().not().isEmpty(),
        body('star').isFloat({ min: 0, max: 5 }),
        body('text').trim().not().isEmpty(),
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
    '/cart', 
    isAuth.user,
    (req, res, next) => {}
);


router.post(
    '/cart',
    isAuth.user,
    [
        body('prodId').isInt(),
    ],
    (req, res, next) => {}
);


router.delete(
    '/cart', 
    isAuth.user,
    (req, res, next) => {}
);

// ORDER *********************************************************

router.get(
    '/order', 
    isAuth.user,
    (req, res, next) => {}
);


router.post(
    '/order',
    isAuth.user,
    [
        body('prodId').isInt(),
    ],
    (req, res, next) => {}
);


router.delete(
    '/order', 
    isAuth.user,
    (req, res, next) => {}
);


router.put(
    '/quantity', 
    isAuth.user,
    [
        body('prodId').isInt(),
        body('quantity').isInt({ min: 2 })
    ],
    (req, res, next) => {}
);





module.exports = router;













