const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const tn = req.headers.authorization.split(' ')[1];
        const decode_tn = jwt.verify(tn, 'RANDOM_TOKEN_SECRET');
        const us_id = decode_tn.us_id;
        if (req.body.us_id && req.body.us_id != us_id) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('invalid request')
        });
    }
};