const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [10, 40],
            msg: "El nombre debe tener entre 10 y 40 caracteres",
          },
          notEmpty: {
            args: true,
            msg: "El nombre no puede estar vacío",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "El email debe ser un correo válido",
          },
          notEmpty: {
            args: true,
            msg: "El email no puede estar vacío",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [40, 60],
            msg: "La contraseña debe tener entre 40 y 60 caracteres",
          },
          notEmpty: {
            args: true,
            msg: "La contraseña no puede estar vacía",
          },
        },
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};
