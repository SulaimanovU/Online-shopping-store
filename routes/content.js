const express = require('express');
const content = require('../controllers/content');
const router = express.Router();



router.get(
    '/products',
    content.getProducts
);


router.get(
    '/product',
    content.getProductData
);



module.exports = router;













