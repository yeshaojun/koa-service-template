const Router = require("koa-router");
const router = new Router();
// 校验规则
const { RegisterValidate } = require("../../validators/validator.js");

// 注册 新增数据
router.post("/v1/user/register", async (ctx) => {
  const v = await new RegisterValidate().validate(ctx);

  const user = {
    nickname: v.get("body.nickname"),
    email: v.get("body.email"),
    password: v.get("body.password1"),
  };
  ctx.body = "register success";
});

module.exports = router;
