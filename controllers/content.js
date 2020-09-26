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
    const prodId = req.query.prodId;
    
    try {
        let product = await Product.findByPk(prodId);
        
        product.dataValues.images = await Image.findAll({ attributes: ['id', 'imageUrl'], where: { productId: prodId } });
        
        product.dataValues.sizes = await ProdSize.findAll({ attributes: ['id', 'rus', 'usa'], where: { productId: prodId } });
        
        res.status(200).json({ product: product });
    }
    catch(err){
        next(err);
    }
}



















