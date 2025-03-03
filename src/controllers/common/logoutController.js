const { revokeToken } = require("../../services/jwt-service");

const logoutController = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send({ 
            statusCode: '401 Unauthorized',
            message: 'Token not provided' 
        });
    }
    revokeToken(token);
    req.user = null;
    res.status(200).send({ 
        statusCode: '200 OK',
        message: "Logout successfully" 
    });
}

module.exports = logoutController;