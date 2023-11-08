"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _bodyParser = require("body-parser");
var _mysql = _interopRequireDefault(require("mysql"));
var _util = _interopRequireDefault(require("util"));
var con = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  database: "dil_uygulamasi",
  password: "15935738a"
});
con.connect(function (err) {
  if (err) console.log("Hata");
});
exports.user = function (kullaniciAdi) {
  this.getUser = function () {
    con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", kullaniciAdi, function (err, result) {
      console.log(result[0]);
    });
  };
};