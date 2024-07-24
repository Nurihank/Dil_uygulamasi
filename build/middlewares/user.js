"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var db = require("../model/database"); //database modelini çağırdık
var getDb = new db(); //objemizi oluşturduk

getDb.connect(); //veri tabanı bağlantısını yaptık

var userMiddleware = function userMiddleware(req, res, next) {
  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
  var authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Token gereklidir"
    });
  }
  //veri tabanı kontrolüde şart yoksa her token her kullanıcıyı açar
  var token = authHeader.split(" ")[1];
  console.log(token);
  _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "Token doğrulama hatası",
        error: err.message
      });
    }
    req.user = decoded; // Opsiyonel: İsteğe kullanıcı bilgisini ekleyin

    next();
  });
};
exports.userMiddleware = userMiddleware;
module.exports = userMiddleware;