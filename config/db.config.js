const { Sequelize } = require("sequelize");
const dataConfig = require("./connectionConfig");

const sequelize = new Sequelize(
  dataConfig.database,
  dataConfig.username,
  dataConfig.password,
  dataConfig.params
);

//models
const userModel = require("../models/userModel");

//update Models
const User = userModel(sequelize, Sequelize);

sequelize.sync();
