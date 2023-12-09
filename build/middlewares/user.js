"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _response = require("express/lib/response");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var db = require("../model/database");
var getDB = new db();
getDB.connect();
var con = getDB.getConnection();
module.exports = /*#__PURE__*/(0, _createClass2["default"])(function userMiddleware(kullaniciAdi) {
  (0, _classCallCheck2["default"])(this, userMiddleware);
  con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result, res) {
    var token = result[0].accesToken;
    //console.log(token)
    if (!token) {
      return "giriş yap";
    }
    _jsonwebtoken["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        return "giriş yap";
      }
    });
  });
});