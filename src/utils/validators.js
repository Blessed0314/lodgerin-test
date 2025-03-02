const { getUser } = require('../services/user-service');

const newUserValidator = async({ name, email, password, roles}) => {
    if( !name || !email || !password || !roles )
        return "Data incomplete";
    
    if (!/^[a-zA-Z\s]+$/.test(name)) 
        return "The field 'name' must be only letters";
    
    if(await getUser(email))
        return "The email is already in use";
}

module.exports = { newUserValidator };