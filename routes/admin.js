const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

// AUTHORIZTION *********************************************************

router.post(
    '/login',
    [
        body('name').trim().not().isEmpty(),
        body('password').trim().not().isEmpty()
    ],
    (req, res, next) => {}
);

// PRODUCT *********************************************************

router.post(
    '/product',
    isAuth.admin,
    [
        body('name').trim().not().isEmpty(),
        body('price').isInt(),
        body('composition').trim().not().isEmpty(),
        body('season').trim().not().isEmpty(),
        body('assurance').isInt(),
        body('madein').trim().not().isEmpty(),
        body('discount').isInt(),
        body('type').isIn(['hoodie', 'sweatshirt', 'hoody']),
        body('gender').isIn(['male', 'female']),
        body('description').trim().not().isEmpty(),
        body('colors').not().isEmpty(),
        body('sizes').not().isEmpty(),
    ],
    (req, res, next) => {}
);


router.put(
    '/product',
    isAuth.admin,
    [
        body('name').trim().not().isEmpty(),
        body('price').isInt(),
        body('composition').trim().not().isEmpty(),
        body('season').trim().not().isEmpty(),
        body('assurance').isInt(),
        body('madein').trim().not().isEmpty(),
        body('discount').isInt(),
        body('type').isIn(['hoodie', 'sweatshirt', 'hoody']),
        body('gender').isIn(['male', 'female']),
        body('description').trim().not().isEmpty(),
        body('colors').not().isEmpty(),
        body('sizes').not().isEmpty(),
    ],
    (req, res, next) => {}
);

router.delete(
    '/product', 
    isAuth.admin,
    (req, res, next) => {}
);

// USER DATA MANIPULATION *********************************************************

router.delete(
    '/usercomment', 
    isAuth.admin,
    (req, res, next) => {}
);

router.get(
    '/userinfo', 
    isAuth.admin,
    (req, res, next) => {}
);


router.get(
    '/newcomment', 
    isAuth.admin,
    (req, res, next) => {}
);


router.put(
    '/acceptcomment', 
    isAuth.admin,
    [
        body('comstate').not().isEmpty(),
    ],
    (req, res, next) => {}
);





module.exports = router;













