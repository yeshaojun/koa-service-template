const bcrypt = require("bcrypt");
const { Sequelize, Model } = require("sequelize");

const { ParameterException, AuthFailed } = require("../../core/httpException");
const { sequelize } = require("../../core/db");

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ParameterException("用户不存在");
    }
    const correct = await bcrypt.compareSync(plainPassword, user.password);
    if (!correct) {
      throw new AuthFailed("密码不正确");
    }
    return user;
  }
}

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
    level: {
      type: Sequelize.INTEGER,
      defaultValue : 10 // 默认权限为10
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  }
);

module.exports = User;
