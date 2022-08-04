const SequeLize = require("sequelize");
const { unset, clone, isArray } = require("lodash");
/**
 * dbname
 * user
 * password
 * obj
 */
const { dbName, host, port, user, password } =
  require("../config/index").database;
const sequelize = new SequeLize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: true,
  tiemzone: "+08:00",
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    freezeTableName: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["updated_at", "created_at", "deleted_at"],
        },
      },
    },
  },
});

sequelize.sync({
  force: false,
});

SequeLize.Model.prototype.toJSON = function () {
  let data = clone(this.dataValues);
  unset(data, "created_at");
  unset(data, "updated_at");
  unset(data, "deleted_at");
  for (key in data) {
    if (key === "image" && data[key].indexOf("http") == -1) {
      data[key] = global.config.host + data[key];
    }
  }
  if (isArray(this.exclude)) {
    this.exclude.forEach((value) => {
      unset(data, value);
    });
  }
  return data;
};

module.exports = {
  sequelize,
};
