const { updateUserPassword } = require("../../services/user-service");
const { passwordValidator } = require("../../utils/validators");

const updatePasswordController = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const errorMessage = await passwordValidator(id, oldPassword, newPassword);
  if (errorMessage)
    return res.status(400).json({
      statusCode: "400 Bad Request",
      message: errorMessage,
    });
  try {
    await updateUserPassword(id, newPassword);
    res.status(200).json({
      statusCode: "200 OK",
      message: `Password updated`,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: "500 Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = updatePasswordController;
