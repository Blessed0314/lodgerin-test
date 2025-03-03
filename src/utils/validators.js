const { getUser } = require('../services/user-service');
const { getRole } = require('../services/role-service');
const { comparePw } = require('../services/bcrypt-service');

const newUserValidator = async({ name, email, password }) => {
    if( !name || !email || !password )
        return "Data incomplete";
    
    if (!/^[a-zA-Z\sñÑ]+$/.test(name)) 
        return "The field 'name' must be only letters";
    
    if(await getUser(email))
        return "The email is already in use";

}

const rolesValidator = async(roles) => {
    if(!roles) return "Roles is required";

    for (const role of roles) {
        const foundRole = await getRole(role.id || role.name);
        if (!foundRole) {
            return `Role ${"with id " + role.id || "with name " + role.name} does not exist`;
        }
    }
}

const searchUserValidator = async (identifier) => {
    try {
        if (!identifier) return "User id is required";
        if (!await getUser(identifier)) return "User not found";
    } catch (error) {
        return error.message;
    }
}

const passwordValidator = async (id, oldPassword, newPassword) => {
    if (!oldPassword) return "Old password is required";
    if (!newPassword) return "New password is required";

    const user = await getUser(id);
    if (!await comparePw(oldPassword, user.password)) return "The current password is incorrect";  
}

module.exports = { newUserValidator, rolesValidator, searchUserValidator, passwordValidator };