var express = require("express");
var { isLoggedMiddleWare } = require("./middleware");
var router = express.Router();

//NOTE: index.js Rendering.
router.get("/", function (req, res, next) {
  res.render("index", { title: "Portfolio Express" });
});
//NOTE: signin rendering
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin" });
});
//NOTE: signup rendering
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});
//NOTE: Logout
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});
//NOTE: My Page Rendering
router.get("/mypage", isLoggedMiddleWare, (req, res, next) => {
  res.render("mypage", { title: "My Page" });
});

module.exports = router;
