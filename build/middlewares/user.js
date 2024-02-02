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
  var _req$headers$authoriz, _req$headers$authoriz2;
  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
  //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
  var requestToken = (_req$headers$authoriz = (_req$headers$authoriz2 = req.headers["authorization"]) === null || _req$headers$authoriz2 === void 0 ? void 0 : _req$headers$authoriz2.split(' ')[1]) !== null && _req$headers$authoriz !== void 0 ? _req$headers$authoriz : null;
  console.log(requestToken);
  var con = getDb.getConnection(); //burda da bağlantıyı getirdik

  if (requestToken == null) {
    return res.status(403).json({
      message: "Token Gereklidir"
    });
  }
  _jsonwebtoken["default"].verify(requestToken, process.env.ACCESS_TOKEN_SECRET, function (err) {
    if (err)
      //tokenin süresi geçtiyse hata vercek
      return res.status(400).json(err);
    next();
  });
};
exports.userMiddleware = userMiddleware;
module.exports = userMiddleware;