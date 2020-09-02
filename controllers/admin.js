const { validationResult } = require('express-validator');
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

