module.exports = {
  environment: "development",
  database: {
    dbName: "test",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
  },
  security: {
    secretKey: "secret",
    expiresIn: 60 * 60 * 24 * 30,
  },
};
