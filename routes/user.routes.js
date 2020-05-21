const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/new", userController.new);
router.get("/message", userController.message);

module.exports = router;
