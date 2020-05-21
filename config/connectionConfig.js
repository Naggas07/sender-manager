require("dotenv");

module.exports = {
  database: "senderManager",
  username: process.env.USERDATABASE,
  password: process.env.PASSWORDDATABASE,
  params: {
    dialect: process.env.DIALECT,
    define: {
      underscored: true,
    },
    operatorsAliases: false,
  },
};
