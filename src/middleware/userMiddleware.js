const { getClaimFromToken } = require('../services/jwt-service');

const isUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const userIdFromToken = getClaimFromToken(token, 'userId');
  const userIdFromParams = req.params.id;

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({
        errorCode: '403 Forbidden',
        message: 'Forbidden: User ID does not match token ID' 
    });
  }
  next();
};

module.exports = {
  isUser,
};