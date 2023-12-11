"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mysql = _interopRequireDefault(require("mysql"));
var db = require("../model/database"); //database modelini çağırdık
var getDb = new db(); //objemizi oluşturduk

getDb.connect(); //veri tabanı bağlantısını yaptık

var admin = "admin";
var authMiddleware = function authMiddleware(req, res, next) {
  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
  //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
  //const token = req.headers["authorization"]?.split(' ')[1]

  var con = getDb.getConnection(); //burda da bağlantıyı getirdik

  con.query("SELECT * FROM admin WHERE kullaniciAdi = ?", admin, function (err, result) {
    if (err) throw err;
    var token = result[0].accesToken;
    if (!token) {
      //hiç giriş yapmadıysa bu hatayı verir 
      return res.status(401).json({
        message: "giriş yapin"
      }); //token yoksa 401 yani bu işlemi gerçekleştiemeizsin diyo
    }

    _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        // burdaki token veritabanından gelcek
        return res.status(400).json(err);
      } //tokenin süresi geçtiyse hata verir

      next();
    });
  });
};
exports.authMiddleware = authMiddleware;
module.exports = authMiddleware;