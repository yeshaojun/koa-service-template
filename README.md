# koa-service-template

koa 搭建服务模板

本项目适合，node 新手或者想快速搭建一套 node 服务。本项目包含以下 5 个优点

### 1.路由自动加载

路由通过 koa-router 实现，项目使用 requireDirectory 插件，自动加载 app/api 下的文件，并自动注册

### 2.全局异常处理

根据 koa 的洋葱模型，自定义异常处理中间件。

项目的异常分为已知异常（主动抛出）未知异常（程序抛出）两类, 通过对 Error 类的二次处理，进行全局的异常抛出

### 3.参数校验

可自定义校验规则进行校验，核心是对 validator 的二次封装

具体使用方式可参考以下代码,也可以自定义校验函数

```
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

  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if(psw1 !== psw2) {
      throw new Error('两个密码必须相同')
    }
  }

}
```

同时，校验器对取参方式也做了处理，可以更加方便的进行取值

```
  const v = await new RegisterValidate().validate(ctx);

  const user = {
    nickname: v.get("body.nickname"),
    email: v.get("body.email"),
    password: v.get("body.password1"),
  };
  ctx.body = "register success";
```

validate 执行时，会遍历 RegisterValidate 上的 validate 开头的函数，以及数组属性进行校验，并且会沿着原型链去找对应的校验规则和方法，也就是说 validate 类之间可以相互继承

### 4.通用的用户权限

### 5.较好的代码风格
