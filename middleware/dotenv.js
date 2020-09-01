module.exports = () => {
    
    if(process.env.NODE_ENV !== 'production'){
        const result = require('dotenv').config();
        if (result.error) {
            throw result.error
        }
    
        return result.parsed;
    }
}

