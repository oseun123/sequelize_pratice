const { Model } = require("sequelize");
const { commonFields, commonOptions } = require("./common");

module.exports = function (sequelize, DataTypes) {
  class Type extends Model {}

  Type.init(
    {
      ...commonFields,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "type 1",
      },
    },
    { ...commonOptions, sequelize }
  );

  //   Types.beforeSync(() => console.log("before creaing the type table"));
  //   Types.afterSync(() => console.log("before creaing the type table"));

  return Type;
};
