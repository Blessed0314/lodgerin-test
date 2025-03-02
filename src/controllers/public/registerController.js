const { createUser } = require("../../services/user-service")
const { encryptPw } = require("../../services/bcrypt-service")
const { newUserValidator } = require("../../utils/validators")

const registerController = async ( req, res ) => {
    const { name, email, password } = req.body;
    const roles = [{ id:2 }];
    
    const errorMessage = await newUserValidator({ name, email, password, roles });
    if (errorMessage) return res.status(400).json({ 
        statusCode: '400 Bad Request',
        message: errorMessage 
    });
    
    try {
        const hashedPassword = await encryptPw(password);
        
        await createUser ({ name, email, password: hashedPassword, roles })
        res.status(201).json({
            statusCode: '201 Created',
            message:`the user '${ name }' has been created`
        });
    } catch (error) {
        res.status(500).json({
            statusCode: '500 Internal Server Error',
            message: error.message
        });
    }
}

module.exports = registerController;