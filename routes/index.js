var express = require("express");
var { database } = require("../database/mysql");
var { v4 } = require("uuid");

var router = express.Router();
const uuid4 = v4;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
