const { validationResult } = require('express-validator');
const ProdSize = require('../models/prod-size');
const Product = require('../models/product');
const Image = require('../models/image');
const Size = require('../models/size');
const jwt = require('jsonwebtoken');



exports.login = (req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    
    const name = req.body.name;
    const password = req.body.password;
    
    const systemName = process.env.SYSTEMNAME || 'empty';
    const systemPassword = process.env.SYSTEMPASSWORD || 'empty';
    
    if(name === systemName && password === systemPassword){
        const token = jwt.sign(
            {
                name: name
            },
            'supersecretadmincode',
            { expiresIn: '1h' }
        );
        res.status(200).json({ token: token });
    }
    else{
        const error = new Error('Wrong admin name or password!');
        error.statusCode = 401;
        throw error;
    }
    
}


exports.createPorduct = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const category = req.body.category;
    const gender = req.body.gender;
    const description = req.body.description;
    const color = req.body.color;
    const sizes = req.body.sizes;
    const images = req.body.images;
    
    let product = {};
    
    try {
        product.Info = await Product.create({
            name: name,
            price: price,
            color: color,
            discount: discount,
            category: category,
            gender: gender,
            description: description,
        });
        
        let imageArray = [];
        let sizeArray = [];
        
        for(let i = 0; i < images.length; i++){
            
            imageArray[i] = await Image.create({
                imageUrl: images[i].url,
                productId: product.Info.id
            })
        }
        
        for(let i = 0; i < sizes.length; i++){
            
            sizeArray[i] = await ProdSize.create({
                sizeId: images[i].id,
                productId: product.Info.id
            })
        }
        
        product.images = imageArray;
        product.sizes = sizeArray;
        
        res.status(200).json({ product: product });
    }
    catch(err) {
        next(err);
    }
    
}




exports.updatePorduct = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error);
    }
    
    const prodId = req.body.prodId;
    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const category = req.body.category;
    const gender = req.body.gender;
    const description = req.body.description;
    const color = req.body.color;
    const sizes = req.body.sizes;
    const images = req.body.images;
    let deletedImages = [];
    let deletedSizes = [];
    
    if(req.body.deletedImages){
        deletedImages = req.body.deletedImages;
    }
    if(req.body.deletedSizes){
        deletedSizes = req.body.deletedSizes;
    }
    
    let product = {};
    
    try {
        const productInstance = await Product.findByPk(prodId);
        
        productInstance.name = name;
        productInstance.price = price;
        productInstance.color = color;
        productInstance.discount = discount;
        productInstance.category = category;
        productInstance.gender = gender;
        productInstance.description = description;
        
        
        product.Info = await productInstance.save();
        
        let imageArray = [];
        let sizeArray = [];
        
        // Here we delete images from database
        for(let i = 0; i < deletedImages.length; i++){
            const imgInstance = await Image.findByPk(deletedImages[i].id);
            
            await imgInstance.destroy();
        }
        
        // Here we delete sizes from database
        for(let i = 0; i < deletedSizes.length; i++){
            const sizeInstance = await ProdSize.findByPk(deletedSizes[i].id);
            
            await sizeInstance.destroy();
        }
        
        
        // Here we create image records to database
        for(let i = 0; i < images.length; i++){
            
            imageArray[i] = await Image.create({
                imageUrl: images[i].url,
                productId: product.Info.id
            })
        }
        
        // Here we create size records to database
        for(let i = 0; i < sizes.length; i++){
            
            sizeArray[i] = await ProdSize.create({
                sizeId: images[i].id,
                productId: product.Info.id
            })
        }
        
        product.images = imageArray;
        product.sizes = sizeArray;
        
        res.status(200).json({ product: product });
    }
    catch(err) {
        next(err);
    }
    
} 



















