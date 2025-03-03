const { Role } = require('../config/db')

const getRole = async (identifier) => {
    let role;
    if (typeof identifier === 'number') {
        role = await Role.findOne({ where: { id: identifier } });
    } else if (typeof identifier === 'string') {
        role = await Role.findOne({ where: { name: identifier } });
    }
    return role;
}

module.exports = { getRole };