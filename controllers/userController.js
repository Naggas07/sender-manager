const sequelize = require("sequelize");

const Users = require("../models/userModel");

module.exports.new = (req, res) => {
  const { name, password, email } = req.body;
  const user = { name, password, email };

  Users.create(user)
    .then((user) => res.json(user))
    .catch((error = res.json({ mes: error.message })));
};

module.exports.message = (req, res) => {
  res.json({ message: "Has llegado a user" });
};
