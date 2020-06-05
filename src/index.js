const { sequelize } = require("./con");
const UserModel = sequelize.import(__dirname + "/models/User.js");
const PostModel = sequelize.import(__dirname + "/models/Post.js");
const TypeModel = sequelize.import(__dirname + "/models/Type.js");

const defineRelations = () => {
  const common = (options) => ({
    ...options,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  UserModel.hasMany(PostModel, common({ foreignKey: "user_id" }));

  // Users.hasMany(Users, { foreignKey: 'supervisor_id', as: 'employees' });
  // Users.belongsTo(Users, { foreignKey: 'supervisor_id', as: 'supervisor' });

  // Users.belongsToMany(
  //   Users,
  //   common({
  //     through: 'users_followers',
  //     foreignKey: 'follower_id',
  //     otherKey: 'following_id',
  //     as: 'followers',
  //   })
  // );

  // Users.belongsToMany(
  //   Users,
  //   common({
  //     through: 'users_followers',
  //     foreignKey: 'following_id',
  //     otherKey: 'follower_id',
  //     as: 'following',
  //   })
  // );

  UserModel.belongsToMany(
    TypeModel,
    common({
      through: "users_types",
      foreignKey: "user_id",
      otherKey: "type_id",
    })
  );

  TypeModel.belongsToMany(
    UserModel,
    common({
      through: "users_types",
      foreignKey: "type_id",
      otherKey: "user_id",
    })
  );

  // UsersTypes.belongsTo(Types, { foreignKey: 'type_id' });
  // UsersTypes.belongsTo(Users, { foreignKey: 'user_id' });
  // Users.hasMany(UsersTypes, common({ foreignKey: 'user_id' }));
  // Types.hasMany(UsersTypes, common({ foreignKey: 'type_id' }));
};

sequelize
  .authenticate()
  .then(async () => {
    console.log("Connected");
    defineRelations();
    await sequelize.sync({ force: true });
  })
  .catch(console.error);
