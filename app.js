const Koa = require("koa");
const parser = require("koa-bodyparser");

const InitManager = require("./core/init");
const catchError = require("./middlewares/exception.js");

const app = new Koa();

// 全局异常处理
app.use(catchError);
// 获取body数据
app.use(parser());
// 初始化路由
InitManager.initCore(app);

app.listen(9000);
