const { Op } = require('sequelize');
const { User, Role } = require('../config/db')

const getUser = async (identifier) => {
    const query = identifier.includes('@') 
        ? { email: identifier } 
        : { id: identifier };
    return await User.findOne({
        where: query,
        include:{
            model: Role,
            attributes: ['name'],
            through: {
                attributes: []
            }  
        }
    })
}

const getUsers = async () => {
    return await User.findAll({
        include:{
            model: Role,
            attributes: ['name'],
            through: {
                attributes: []
            }  
        }
    })
}

const createUser = async (user) => {
    const idRoles = await Role.findAll({
      attributes: ['id'],
      where: {
        name: {[Op.in]: user.roles}
      }
    })

    const newUser = await User.create(user);
    await newUser.addRoles(idRoles);
    return newUser;
}

const updateUser = async (id, user) => {
    const idRoles = await Role.findAll({
      attributes: ['id'],
      where: {
        name: {[Op.in]: user.roles}
      }
    })

    const updatedUser = await User.update(user, {
        where: { id },
        returning: true
    });

    const userUpdated = await User.findByPk(id);
    await userUpdated.setRoles(idRoles);
    return updatedUser;
}

const updateUserPassword = async (id, password) => {
    return await User.update({ password }, {
        where: { id },
        returning: true
    });
}
