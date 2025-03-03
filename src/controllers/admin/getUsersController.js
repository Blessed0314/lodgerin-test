const { getUsers } = require("../../services/user-service");

const getUsersController = async (req, res) => {
    const users = await getUsers();
    return res.status(200).json({
        statusCode: "200 OK",
        users
    });
}

module.exports = getUsersController;