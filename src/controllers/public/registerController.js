const { createUser } = require("../../services/user-service")
const { newUserValidator } = require("../../utils/validators")

const registerController = async ( req, res ) => {
    const { name, email, password } = req.body;
    
    const errorMessage = await newUserValidator({ name, email, password });
    if (errorMessage) return res.status(400).json({ 
        statusCode: '400 Bad Request',
        message: errorMessage 
    });
    
    try {
        await createUser ({ name, email, password })
        res.status(201).json({
            statusCode: '201 Created',
            message:`Hi '${ name }', your user has been created`
        });
    } catch (error) {
        res.status(500).json({
            statusCode: '500 Internal Server Error',
            message: error.message
        });
    }
}

module.exports = registerController;