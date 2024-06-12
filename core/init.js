// 文件自动导入插件
const requireDirectory = require("require-directory");
const Router = require("koa-router");
const {
  swaggerUi,
  swaggerSpec,
  router: swaggerRouter,
} = require("../swagger/swagger");

// 使用静态方法，不需要实例化
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initRouters();
    InitManager.loadConfig();
    InitManager.initSwagger();
  }
  // 动态加载路由
  static initRouters() {
    const apiDirectory = `${process.cwd()}/app/api`;
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes());
        } else {
          // 兼容多模块导出
          if (obj instanceof Object && obj.router) {
            for (let r in obj) {
              if (r instanceof Router) {
                InitManager.app.use(obj[r].routes());
              }
            }
          }
        }
      },
    });
  }
  // 加载全局变量
  static loadConfig(path = "") {
    const configPath = path || process.cwd() + "/config/index.js";
    const config = require(configPath);
    global.config = config;
  }
  // 加载接口文档
  static initSwagger() {
    InitManager.app.use(swaggerUi.serve);
    InitManager.app.use(
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          url: "/swagger.json", // Point to the Swagger JSON endpoint
        },
      })
    );
    InitManager.app
      .use(swaggerRouter.routes())
      .use(swaggerRouter.allowedMethods());
  }
}

module.exports = InitManager;
