"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _mysql = _interopRequireDefault(require("mysql"));
var _util = _interopRequireDefault(require("util"));
var router = require("express").Router(); //routerları export etmek için  

var con = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "15935738a",
  database: "dil_uygulamasi"
});
con.connect(function (err) {
  if (err) {
    throw err;
  }
});