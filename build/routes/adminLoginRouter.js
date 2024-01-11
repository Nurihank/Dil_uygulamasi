"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mysql = _interopRequireDefault(require("mysql"));
var _md = _interopRequireDefault(require("md5"));
var router = require("express").Router(); //routerları export etmek için  

var jwt = require("jsonwebtoken");
var db = require("../model/database");
var getDb = new db();
getDb.connect();
router.get("/signin", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var sifre = req.body.sifre;
  var passwordToken = (0, _md["default"])(sifre);
  var con = getDb.getConnection();
  con.query("SELECT * FROM admin WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result) {
    if (err) throw err;
    if (passwordToken == result[0].sifre) {
      var accessToken = jwt.sign({
        kullaniciAdi: kullaniciAdi
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
      });
      var refreshToken = jwt.sign({
        kullaniciAdi: kullaniciAdi
      }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "120m"
      });
      con.query("UPDATE admin SET accesToken = ? , refreshToken = ? WHERE kullaniciAdi = ?", [accessToken, refreshToken, kullaniciAdi]);
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } else {
      res.send("şifre hatalı");
    }
  });
});
module.exports = router;