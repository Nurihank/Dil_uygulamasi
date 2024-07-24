'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _mysql = _interopRequireDefault(require("mysql"));
module.exports = /*#__PURE__*/function () {
  function Database() {
    (0, _classCallCheck2["default"])(this, Database);
    this.con = _mysql["default"].createConnection({
      host: "localhost",
      user: "root",
      password: "Team2010",
      database: "dil_uygulamasi"
    });
  }
  (0, _createClass2["default"])(Database, [{
    key: "connect",
    value: function connect() {
      this.con.connect(function (err) {
        if (err) {
          throw err;
        }
      });
    }
  }, {
    key: "getConnection",
    value: function getConnection() {
      return this.con;
    }
  }]);
  return Database;
}();