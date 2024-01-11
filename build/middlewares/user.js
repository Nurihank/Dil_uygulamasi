"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _util = _interopRequireDefault(require("util"));
var db = require("../model/database");
var getDb = new db();
getDb.connect(); //sql bağlantısı yaptık

var userMiddleware = function userMiddleware(req, res, next) {
  var con = getDb.getConnection(); //bağlantıyı getirdik 

  var userMiddleware = function userMiddleware(kullaniciAdi) {
    con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", [kullaniciAdi], function (err, result) {
      if (err) throw err;
      var token = result[0].accesToken;
      if (!token) {
        console.log("asd");
        return res.status(401).json({
          message: "Giriş yapin"
        }); //token yoksa giriş yap mesajı gönderir
      }

      _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err) {
        if (err) {
          console.log(amk);
          return res.status(400).json(err);
        }
      });
      next();
    });
  };
};
exports.userMiddleware = userMiddleware;