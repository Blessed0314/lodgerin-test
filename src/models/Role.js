const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 10],
            msg: "El nombre debe tener entre 3 y 20 caracteres",
          },
          notEmpty: {
            args: true,
            msg: "El nombre no puede estar vacío",
          },
        },
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  
};
