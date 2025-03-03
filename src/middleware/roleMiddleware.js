const { getClaimFromToken, verifyToken } = require('../services/jwt-service');

const adminMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            errorCode: '401 Unauthorized',
            message: 'Token not provided' 
        });
    }

    const { valid, decoded, error } = verifyToken(token);

    if (!valid) {
        return res.status(401).json({
            errorCode: '401 Unauthorized', 
            message: error, 
        });
    }

    const roles = getClaimFromToken(token, 'roles');

    if (!roles || !Array.isArray(roles) || !roles.includes('admin')) {
        return res.status(401).json({
            errorCode: '401 Unauthorized', 
            message: "You don't have the necessary permissions to access this resource", 
        });
    }

    req.user = decoded; 
    next();
};

const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({
            errorCode: '401 Unauthorized',
            message: 'Token not provided' 
        });
    }

    const { valid, decoded, error } = verifyToken(token);

    if (!valid) {
        return res.status(401).json({
            errorCode: '401 Unauthorized', 
            message: error, 
        });
    }

    req.user = decoded; 
    next();
};

module.exports = { adminMiddleware, userMiddleware };