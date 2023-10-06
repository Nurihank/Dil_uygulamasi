"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("mysql"));
var _express = _interopRequireDefault(require("express"));
var _util = _interopRequireDefault(require("util"));
var router = require("express").Router(); //routerları export etmek için   
//sql bağlantısı kurmak için

var con = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "15935738a",
  database: "dil_uygulamasi"
});
con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connection Successful");
  }
});
var query = _util["default"].promisify(con.query).bind(con);

//bilgileri getirme usermodel tarzı bişiler yapacaksın
function languageFind(_x) {
  return _languageFind.apply(this, arguments);
}
function _languageFind() {
  _languageFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(language) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return query("Select COUNT(*) as sayi FROM dil WHERE dil_adi = ?", language);
        case 2:
          result = _context3.sent;
          console.log(result[0].sayi);
          if (!(result[0].sayi == 1)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", true);
        case 8:
          return _context3.abrupt("return", false);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _languageFind.apply(this, arguments);
}
function jobFind(_x2) {
  return _jobFind.apply(this, arguments);
}
function _jobFind() {
  _jobFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(meslek) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return query("Select COUNT(*) as sayi FROM meslek WHERE meslek = ?", meslek);
        case 2:
          result = _context4.sent;
          console.log(result[0].sayi);
          if (!(result[0].sayi == 1)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", true);
        case 8:
          return _context4.abrupt("return", false);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _jobFind.apply(this, arguments);
}
router.get("/language", function (req, res) {
  con.query("SELECT * FROM dil", function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
router.get("/language/:id", function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM dil where id = ? ", id, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
router.post("/addLanguage", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var dil, isLanguageExist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dil = req.body.dil;
          _context.next = 3;
          return languageFind(dil);
        case 3:
          isLanguageExist = _context.sent;
          if (isLanguageExist == true) {
            res.send("Böyle bir dil vardir");
          } else {
            con.query("INSERT INTO dil (dil_adi) values (?)", dil, function (err, result) {
              if (err) {
                throw err;
              }
              res.send("Dil eklendi");
            });
          }
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/job", function (req, res) {
  con.query("SELECT * FROM meslek", function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.get("/job/:id", function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM meslek where idMeslek = ?", id, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.post("/addJob", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var job, isJobExist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          job = req.body.job;
          _context2.next = 3;
          return jobFind(job);
        case 3:
          isJobExist = _context2.sent;
          if (isJobExist == true) {
            res.send("Böyle bir meslek vardir");
          } else {
            con.query("INSERT INTO meslek (meslek) values (?)", job, function (err, result) {
              if (err) {
                throw err;
              }
              res.send("Meslek eklendi");
            });
          }
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;