const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const dataConfig = require("./connectionConfig");

let db = null;

module.exports = (connection) => {
  if (!db) {
    const sequelize = new Sequelize(
      dataConfig.database,
      dataConfig.username,
      dataConfig.password,
      dataConfig.params
    );

    db = {
      sequelize,
      Sequelize,
      models: {},
    };

    const models = path.join(__dirname, "models");
    fs.readFileSync(models).map((file) => {
      const fileDir = path.join(models, file);
      const model = sequelize.import(fileDir);
      db.models[model.name] = model;
    });

    Object.keys(db.models).map((model) => {
      db.models[model].associate(db.models);
    });
  }

  return db;
};
