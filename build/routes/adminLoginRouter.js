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
  //kullanıcı hatasını kontrol eden bir kod yaz unutma
  con.query("SELECT * FROM admin WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result) {
    if (err) throw err;

    //girişte sıkıntı var hallet 
    if (passwordToken == result[0].sifre) {
      var accessToken = jwt.sign({
        kullaniciAdi: kullaniciAdi
      }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
      });
      //burda giriş yapınca oluşan accesToken postmande direkt authorizationa gidiyor
      //https://stackoverflow.com/questions/49785592/bearer-token-in-postman

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
      res.json({
        message: "şifre hatali"
      });
    }
  });
});
module.exports = router;