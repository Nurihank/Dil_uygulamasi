"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var jwt = require('jsonwebtoken');
var db = require("../model/database"); // database modelini çağırdık
var getDb = new db(); // objemizi oluşturduk

getDb.connect(); // veri tabanı bağlantısını yaptık

// Promisify yapısı: query'yi promise'a çeviriyoruz
var queryAsync = function queryAsync(con, query, params) {
  return new Promise(function (resolve, reject) {
    con.query(query, params, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
var userMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var con, requestToken, token, decodedTokenContent, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          con = getDb.getConnection();
          requestToken = req.headers["authorization"] || req.headers["Authorization"];
          if (requestToken) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(403).json({
            message: "Token gereklidir"
          }));
        case 4:
          token = requestToken.substring(7); // "Bearer " uzunluğu 7
          if (token.startsWith('"') && token.endsWith('"')) {
            token = token.substring(1, token.length - 1); // Başındaki ve sonundaki tırnak işaretlerini kaldır
          }
          decodedTokenContent = jwt.decode(token);
          _context.prev = 7;
          _context.next = 10;
          return queryAsync(con, "SELECT accesToken FROM kullanici WHERE id = ?", [decodedTokenContent.id]);
        case 10:
          result = _context.sent;
          if (!(result[0].accesToken !== token)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: "Token doğru değil"
          }));
        case 13:
          // Token'ı doğruluyoruz
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
              if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                  message: "Token süresi dolmuş"
                });
              } else {
                return res.status(401).json({
                  message: "Token doğrulama hatası",
                  error: err.message
                });
              }
            }
            req.user = decoded; // Kullanıcı bilgilerini isteğe ekliyoruz
            next(); // Sonraki middleware'e geçiyoruz
          });
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](7);
          console.error("Database error:", _context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Veritabanı hatası",
            error: _context.t0.message
          }));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 16]]);
  }));
  return function userMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = userMiddleware;