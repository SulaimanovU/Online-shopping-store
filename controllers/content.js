const Product = require('../models/product');
const Image = require('../models/image');


exports.getProducts = async (req, res, next) => {
    const category = req.query.category;
    
    const currentPage = req.query.page || 1;
    const perPage = 10;
    
    try {
        const products = await Product.findAll({
            where: {
                category: category
            },
            offset: (currentPage - 1) * perPage, 
            limit: perPage
        });
        
        for(let i = 0; i < products.length; i++){
            products[i].image = await Image.findOne({ where: { productId: products[i].id } });
        }
        
        res.status(200).json({ products: products });
    }
    catch(err) {
        next(err);
    }
}


exports.getProductData = async (req, res, next) => {
    
}