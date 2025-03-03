const { getClaimFromToken } = require("../services/jwt-service");

const isGuestUserMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userIdFromToken = getClaimFromToken(token, "userId");
  const userIdFromParams = req.params.id;

  if (userIdFromToken !== userIdFromParams) {
    return res.status(403).json({
      errorCode: "403 Forbidden",
      message: "Forbidden: User ID does not match token ID",
    });
  }
  next();
};

const updateGuestUserMiddleware = (req, res, next) => {
  if (req.body.password)
    return res.status(403).json({
      errorCode: "403 Forbidden",
      message: "Forbidden: Password cannot be updated by put method",
    });
  
  if(req.body.roles)
    return res.status(403).json({
      errorCode: "403 Forbidden",
      message: "Forbidden: You don't have permission to update your role",
    });
  next();
};

module.exports = {
  isGuestUserMiddleware,
  updateGuestUserMiddleware,
};
