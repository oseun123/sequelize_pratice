const { Model } = require("sequelize");
const { commonFields, commonOptions } = require("./common");

module.exports = function (sequelize, DataTypes) {
  class User extends Model {}
  User.init(
    {
      ...commonFields,
      first_name: {
        type: DataTypes.STRING({ length: 256 }),
        allowNull: false,
        unique: true,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING({ length: 256 }),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    { ...commonOptions, sequelize }
  );

  // User.beforeSync(() => console.log("b4 creating the user table"));
  // User.afterSync(() => console.log("after creating the user table"));

  return User;
};
