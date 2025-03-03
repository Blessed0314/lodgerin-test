const { getUser } = require("../../services/user-service");

const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({
        statusCode: "404 Not Found",
        error: "User not found",
      });
    }
    return res.status(200).json({
      statusCode: "200 OK",
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.Roles
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: "500 Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = getUserController;
