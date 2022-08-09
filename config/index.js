module.exports = {
  environment: "development",
  database: {
    dbName: "test",
    host: "localhost",
    port: 27017,
    user: "",
    password: "",
  },
  security: {
    secretKey: "secret",
    expiresIn: 60 * 60 * 24 * 30,
  },
};
