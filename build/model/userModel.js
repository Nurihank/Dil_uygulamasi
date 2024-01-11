"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bodyParser = require("body-parser");
var _mysql = _interopRequireDefault(require("mysql"));
var _util = _interopRequireDefault(require("util"));
var db = require("./database");
var getDb = new db();
getDb.connect();
exports.user = function (kullaniciAdi) {
  var con = getDb.getConnection();
  var query = _util["default"].promisify(con.query).bind(con); //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık

  this.userInfo = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi);
        case 2:
          result = _context.sent;
          return _context.abrupt("return", result);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  this.userFind = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi);
        case 2:
          result = _context2.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", true);
        case 8:
          return _context2.abrupt("return", false);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
};