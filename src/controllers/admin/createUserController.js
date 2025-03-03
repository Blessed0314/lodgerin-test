const { createUser } = require("../../services/user-service");
const { newUserValidator, rolesValidator } = require("../../utils/validators");

const createUserController = async (req, res) => {
  const { name, email, password, roles } = req.body;

  const errorMessage = await newUserValidator({ name, email, password });
  const roleErrorMessage = await rolesValidator(roles);

  if (errorMessage || roleErrorMessage)
    return res.status(400).json({
      statusCode: "400 Bad Request",
      message: errorMessage || roleErrorMessage,
    });

  try {
    await createUser({ name, email, password, roles });
    res.status(201).json({
      statusCode: "201 Created",
      message: `the user '${name}' has been created`,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: "500 Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = createUserController; 