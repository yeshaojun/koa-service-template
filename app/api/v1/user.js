const Router = require("koa-router");
const router = new Router();
// 校验规则
const { RegisterValidate } = require("../../validators/validator.js");
const { Success } = require("../../../core/httpException");
const User = require("../../models/user.js");
// 注册 新增数据
router.post("/v1/user/register", async (ctx) => {
  const v = await new RegisterValidate().validate(ctx);
  // 密码需要加密，放在模型中统一处理
  const user = {
    nickname: v.get("body.nickname"),
    email: v.get("body.email"),
    password: v.get("body.password1"),
  };
  await User.create(user);
  throw new Success();
});

module.exports = router;
