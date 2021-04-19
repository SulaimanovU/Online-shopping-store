const func = require('../controllers/start');

test('adds 1 + 2 to equal 3', () => {
    const num1 = 1;
    const num2 = 2
    expect(func.add(num1, num2)).toBe(3);
});


