const { getUser } = require("../../services/user-service");
const { createToken } = require("../../services/jwt-service")
const { comparePw } = require( "../../services/bcrypt-service" )

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUser(email);
    
    if (!user) {
      return res.status(401).json({
        statusCode: "401 Unauthorized", 
        message: "Invalid email or password" 
      });
    }
  
    if (!await comparePw ( password, user.password )) {
      return res.status(401).json({ 
        statusCode: "401 Unauthorized",
        message: "Invalid email or password" 
      });
    }

    const roleNames = user.Roles.map(role => role.dataValues.name);
    const token = createToken(user.id, roleNames);

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      statusCode: "500 Internal Server Error", 
      message: error.message 
    });
  }
};

module.exports = loginController;
