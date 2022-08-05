const { LinValidator, Rule } = require("../../core/validator");

class RegisterValidate extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "邮箱不符合规范")];
    this.password1 = [
      // 密码 用户制定范围
      new Rule("isLength", "密码至少6位，最多为32位", { min: 6, max: 32 }),
      new Rule(
        "matches",
        "密码不符合规范",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      ),
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule("isLength", "昵称长度不符合", { min: 2, max: 12 }),
    ];
  }
}

class LoginValidate extends LinValidator {
  constructor() {
    super();
    this.email = [new Rule("isEmail", "邮箱不符合规范")];
    this.password = [
      // 密码 用户制定范围
      new Rule("isLength", "密码至少6位，最多为32位", { min: 6, max: 32 }),
      new Rule(
        "matches",
        "密码不符合规范",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      ),
    ];
  }
}

module.exports = {
  RegisterValidate,
  LoginValidate,
};
