const { updateUser } = require("../../services/user-service");
const { searchUserValidator } = require("../../utils/validators");

const updateUserController = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  const errorMessage = await searchUserValidator(id);
  if (errorMessage) {
    return res.status(400).json({
      statusCode: "400 Bad Request",
      message: errorMessage,
    });
  }
  try {
    await updateUser(id, user);
    return res.status(200).json({
      statusCode: "200 OK",
      message:`User with id ${id} updated successfully`,
    })
  } catch (error) {
    return res.status(500).json({
      statusCode: "500 Internal Server Error",
      message: error.message,
    });
  }
};

module.exports = updateUserController;
