const { Op } = require("sequelize");
const { User, Role, conn } = require("../config/db");
const { encryptPw } = require("./bcrypt-service");

const getUser = async (identifier) => {
  const query = identifier.includes("@")
    ? { email: identifier }
    : { id: identifier };
  return await User.findOne({
    where: query,
    include: {
      model: Role,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getUsers = async () => {
  return await User.findAll({
    include: {
      model: Role,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const createUser = async ({ name, email, password, roles }) => {
  const transaction = await conn.transaction();
  try {
    const rolesUser = roles ? roles : [{ id: 2 }];
    const idRoles = rolesUser.map((role) => role.id);

    const newUser = await User.create(
      {
        name,
        email,
        password: await encryptPw(password),
      },
      { transaction }
    );

    await newUser.addRoles(idRoles, { transaction });
    await transaction.commit();
    return newUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateUser = async (id, user) => {
  const idRoles = await Role.findAll({
    attributes: ["id"],
    where: {
      name: { [Op.in]: user.roles },
    },
  });

  const updatedUser = await User.update(user, {
    where: { id },
    returning: true,
  });

  const userUpdated = await User.findByPk(id);
  await userUpdated.setRoles(idRoles);
  return updatedUser;
};

const updateUserPassword = async (id, password) => {
  return await User.update(
    { password },
    {
      where: { id },
      returning: true,
    }
  );
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateUserPassword,
};
