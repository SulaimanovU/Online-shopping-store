const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');
const admin = require('../controllers/admin');
const router = express.Router();

// AUTHORIZTION *********************************************************

router.post(
    '/login',
    [
        body('name').trim().not().isEmpty(),
        body('password').trim().not().isEmpty()
    ],
    admin.login
);

// PRODUCT *********************************************************

router.post(
    '/product',
    isAuth.admin,
    [
        body('name').trim().not().isEmpty(),
        body('price').isInt(),
        body('discount').isInt(),
        body('category').isIn(['hoodie', 'sweatshirt', 'hoody']),
        body('gender').isIn(['male', 'female', 'unisex']),
        body('description').trim().not().isEmpty(),
        body('color').not().isEmpty(),
        body('sizes').not().isEmpty(),
        body('images').not().isEmpty()
    ],
    admin.createPorduct
);


router.put(
    '/product',
    isAuth.admin,
    [
        body('prodId').isInt(),
        body('name').trim().not().isEmpty(),
        body('price').isInt(),
        body('discount').isInt({ max: 100 }),
        body('category').isIn(['hoodie', 'sweatshirt', 'hoody']),
        body('gender').isIn(['male', 'female', 'unisex']),
        body('description').trim().not().isEmpty(),
        body('color').not().isEmpty()
    ],
    admin.updatePorduct
);

router.delete(
    '/product', 
    isAuth.admin,
    admin.deleteProduct
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













