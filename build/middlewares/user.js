"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _util = _interopRequireDefault(require("util"));
var db = require("../model/database");
var getDb = new db();
getDb.connect();
exports.userMiddleware = function (kullaniciAdi) {
  var con = getDb.getConnection();
  var query = _util["default"].promisify(con.query).bind(con);
  this.tokenVerify = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var result, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", kullaniciAdi);
        case 2:
          result = _context.sent;
          token = result[0].accesToken;
          console.log(token);
          if (!token) {
            console.log("asf");
          }
          _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
            if (err) {
              console.log("sdsas");
            }
          });
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
};