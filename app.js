require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

/**
 * DB config
 */
require("./config/db.config");
const session = require("./config/session.config");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);

app.use((req, res, next) => {
  req.currentUser = req.session.user;
  next();
});

// import routes
const userRoutes = require("./routes/user.routes");

//use routes
app.use("/user", userRoutes);

/**
 * Listen on provided port
 */
const port = normalizePort(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
