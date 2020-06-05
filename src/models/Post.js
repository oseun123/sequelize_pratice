const { Model } = require("sequelize");
const { commonFields, commonOptions } = require("./common");

module.exports = function (sequelize, DataTypes) {
  class Post extends Model {}
  Post.init(
    {
      ...commonFields,
      title: {
        type: DataTypes.STRING({ length: 256 }),
        allowNull: false,
        unique: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { ...commonOptions, sequelize }
  );

  // Post.beforeSync(() => console.log("b4 creating the Post table"));
  // Post.afterSync(() => console.log("after creating the Post table"));

  return Post;
};
