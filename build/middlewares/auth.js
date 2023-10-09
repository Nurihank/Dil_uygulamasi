"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var authMiddleware = function authMiddleware(req, res, next) {
  var _req$headers$authoriz;
  // yetkisi olan birinin erişebilmesi için bu middleware yi yazdık
  //Bearer = token başta bu halde ondan split dedik bu headeri ikiye bölcek
  var token = (_req$headers$authoriz = req.headers["authorization"]) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: "giriş yapin"
    }); //token yoksa 401 yani bu işlemi gerçekleştiemeizsin diyo
  }

  _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    //tokeni doğruluyo eğer doğruysa user objesini döndürüyor 
    if (err) {
      return res.status(400).json(err);
    }
    req.user = user;
    next();
  });
};
exports.authMiddleware = authMiddleware;
module.exports = authMiddleware;