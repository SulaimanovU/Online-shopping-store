const ProdSize = require('../models/prod-size');
const Product = require('../models/product');
const Image = require('../models/image');


exports.getProducts = async (req, res, next) => {
    const category = req.query.category;
    
    const currentPage = req.query.page || 1;
    const perPage = 10;
    
    try {
        let products = await Product.findAll({
            where: {
                category: category
            },
            offset: (currentPage - 1) * perPage, 
            limit: perPage
        });
        
        for(let i = 0; i < products.length; i++){
            products[i].dataValues.image = await Image.findOne({ where: { productId: products[i].id } });
        }
        
        res.status(200).json({ products: products });
    }
    catch(err) {
        next(err);
    }
}


exports.getProductData = async (req, res, next) => {
    
    if(req.query.prodId === undefined || req.query.prodId === null){
        const error = new Error(`You did not pass a 'prodId' query parameter`);
        error.statusCode = 422;
        error.data = 'query[prodId] - is empty';
        next(error);
    }
    
    const prodId = req.query.prodId;
    
    let product = {};
    
    try {
        product.info = await Product.findByPk(prodId);
        
        product.images = await Image.findAll({ attributes: ['id', 'imageUrl'], where: { productId: prodId } });
        
        product.sizes = await ProdSize.findAll({ attributes: ['id', 'rus', 'usa'], where: { productId: prodId } });
        
        res.status(200).json({ product: product });
    }
    catch(err){
        next(err);
    }
}



















