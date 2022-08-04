const bcrypt = require("bcrypt");
const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      set(val) {
        // 设计模式 观察者模式
        // ES6 Reflect
        // const v = await new RegisterValidate().validate(ctx)
        const salt = bcrypt.genSaltSync(10);
        // 10表示花费的成本
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  }
);

module.exports = User;
