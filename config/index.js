module.exports = {
  environment: "development",
  database: {
    dbName: "koa-im",
    host: "119.45.209.87",
    port: 3306,
    user: "root",
    password: "qq5056",
  },
  security: {
    secretKey: "secret",
    expiresIn: 60 * 60 * 24 * 30,
  },
};
