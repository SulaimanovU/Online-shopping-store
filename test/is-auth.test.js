const authMiddleware = require('../middleware/is-auth');


test('should throw an error if no authorization header is present', () => {
    const req = {
        get: (headerName) => {
            return null;
        }
    };
    
    expect(authMiddleware.user(req, {}, () => {})).toThrow('Not authenticated.');
})