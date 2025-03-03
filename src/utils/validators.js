const { getUser } = require('../services/user-service');
const { getRole } = require('../services/role-service');

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


module.exports = { newUserValidator, rolesValidator };