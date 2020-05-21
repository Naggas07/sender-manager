const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const Sequelize = require("sequelize");
const dataConfig = require("./connectionConfig");

const SESSION_MAX_AGE_SECONDS =
  Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 * 7;

const sequelize = new Sequelize(
  dataConfig.database,
  dataConfig.username,
  dataConfig.password,
  dataConfig.params
);

module.exports = session({
  secret: process.env.SESSION_SECRET || "Secret",
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: process.env.SESSION_SECURE || false,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS * 1000,
  },
  store: new SessionStore({
    db: sequelize,
    expiration: SESSION_MAX_AGE_SECONDS,
  }),
});
