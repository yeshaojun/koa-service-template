const Router = require("koa-router");

const { generateToken } = require("../../../core/utils");
const { Auth } = require("../../../middlewares/auth");
const router = new Router({
  prefix: "/v1/user",
});
// 校验规则
const {
  RegisterValidate,
  LoginValidate,
} = require("../../validators/validator.js");
const { Success } = require("../../../core/httpException");
const User = require("../../models/user.js");
// 注册 新增数据
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Register a new user with email, nickname, and password
 */
router.post("/register", async (ctx) => {
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

router.post("/login", async (ctx) => {
  console.log("V", ctx);
  const v = await new LoginValidate().validate(ctx);
  const user = await User.verifyEmailPassword(
    v.get("body.email"),
    v.get("body.password")
  );
  ctx.body = {
    token: generateToken(user.id, user.level),
  };
});

router.get("/info", new Auth().check, async (ctx) => {
  const user = await User.findOne({
    attributes: {
      exclude: ["password"],
    },
    where: {
      id: ctx.auth.uid,
    },
  });
  ctx.body = user;
});

router.get("/test", async (ctx) => {
  console.log(ctx.request.body, ctx.request.header);
  ctx.body = {
    code: 0,
    data: ["1", 2],
    msg: "ok",
  };
});

module.exports = router;
