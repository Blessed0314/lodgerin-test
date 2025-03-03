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
    attributes: { exclude: ["password"] },
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
  const { name, password, email, roles } = user;

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;
  if (password) updatedFields.password = await encryptPw(password);

  const transaction = await conn.transaction();
  try {
    const updatedUser = await User.update(updatedFields, {
      where: { id },
      returning: true,
      transaction,
    });

    if (roles) {
      const idRoles = roles.map((role) => role.id);

      const userUpdated = await User.findByPk(id, { transaction });
      await userUpdated.setRoles(idRoles, { transaction });
    }

    await transaction.commit();
    return updatedUser;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
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
