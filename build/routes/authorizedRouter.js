"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("mysql"));
var _express = _interopRequireDefault(require("express"));
var _util = _interopRequireDefault(require("util"));
var _console = require("console");
var _auth = _interopRequireDefault(require("../middlewares/auth.js"));
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
function languageFind(_x) {
  return _languageFind.apply(this, arguments);
}
function _languageFind() {
  _languageFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(language) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return query("Select COUNT(*) as sayi FROM dil WHERE dil_adi = ?", language);
        case 2:
          result = _context7.sent;
          if (!(result[0].sayi == 1)) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", true);
        case 7:
          return _context7.abrupt("return", false);
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _languageFind.apply(this, arguments);
}
function jobFind(_x2) {
  return _jobFind.apply(this, arguments);
}
function _jobFind() {
  _jobFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(meslek) {
    var result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return query("Select COUNT(*) as sayi FROM meslek WHERE meslek = ?", meslek);
        case 2:
          result = _context8.sent;
          if (!(result[0].sayi == 1)) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", true);
        case 7:
          return _context8.abrupt("return", false);
        case 8:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _jobFind.apply(this, arguments);
}
function wordFind(_x3) {
  return _wordFind.apply(this, arguments);
}
function _wordFind() {
  _wordFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(word) {
    var result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return query("SELECT COUNT(*) as sayi FROM kelime WHERE kelime = ?", word);
        case 2:
          result = _context9.sent;
          if (!result[0].sayi) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", true);
        case 7:
          return _context9.abrupt("return", false);
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _wordFind.apply(this, arguments);
}
router.get("/language", _auth["default"], function (req, res) {
  con.query("SELECT * FROM dil", function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
router.get("/language/:id", _auth["default"], function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM dil where id = ? ", id, function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
router.post("/language", _auth["default"], /*#__PURE__*/function () {
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
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());
router["delete"]("/language", _auth["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var dil, isLanguageExist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          dil = req.body.dil;
          _context2.next = 3;
          return languageFind(dil);
        case 3:
          isLanguageExist = _context2.sent;
          if (isLanguageExist == true) {
            con.query("DELETE FROM dil WHERE dil_adi = ? ", dil, function (err) {
              if (err) {
                throw err;
              }
              res.send("Basarili bir sekilde silindi");
            });
          } else {
            res.send("Böyle bir dil bulunamadi");
          }
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/job", _auth["default"], function (req, res) {
  con.query("SELECT * FROM meslek", function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.get("/job/:id", _auth["default"], function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM meslek where idMeslek = ?", id, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.post("/job", _auth["default"], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var job, isJobExist;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          job = req.body.job;
          _context3.next = 3;
          return jobFind(job);
        case 3:
          isJobExist = _context3.sent;
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
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]("/job", _auth["default"], /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var meslek, isJobExist;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          meslek = req.body.meslek;
          _context4.next = 3;
          return jobFind(meslek);
        case 3:
          isJobExist = _context4.sent;
          if (isJobExist == true) {
            con.query("DELETE FROM meslek WHERE meslek = ? ", meslek, function (err) {
              if (err) {
                throw err;
              }
              res.send("Basarili bir sekilde silindi");
            });
          } else {
            res.send("Böyle bir meslek bulunamadi");
          }
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/word", _auth["default"], function (req, res) {
  con.query("SELECT * FROM kelime", function (err, result) {
    res.send(result);
  });
});
router.get("/word/:id", _auth["default"], function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM kelime Where id = ?", id, function (err, result) {
    res.send(result);
  });
});
router.post("/word", _auth["default"], /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var kelime, kategori_id, isWordExist;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          kelime = req.body.kelime;
          kategori_id = req.body.kategori_id;
          _context5.next = 4;
          return wordFind(kelime);
        case 4:
          isWordExist = _context5.sent;
          if (isWordExist == true) {
            res.send("Böyle bir kelime vardir");
          } else {
            con.query("INSERT INTO kelime (kategori_id,kelime) values (?,?)", [kategori_id, kelime], function (err, result) {
              if (err) {
                throw err;
              } else {
                res.send("Kelime eklendi");
              }
            });
          }
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
router["delete"]("/word", _auth["default"], /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var kelime, isWordExist;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          kelime = req.body.kelime;
          _context6.next = 3;
          return wordFind(kelime);
        case 3:
          isWordExist = _context6.sent;
          if (isWordExist == true) {
            con.query("DELETE FROM kelime WHERE kelime = ? ", kelime, function (err) {
              if (err) {
                throw err;
              }
              res.send("Basarili bir sekilde silindi");
            });
          } else {
            res.send("Böyle bir kelime bulunamadi");
          }
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}());
router.get("/category", _auth["default"], function (req, res) {
  con.query("SELECT * FROM kategori", function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.get("/category/:id", _auth["default"], function (req, res) {
  var id = req.params.id;
  con.query("SELECT * FROM kategori WHERE id = ?", id, function (err, result) {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});
router.post("/category", _auth["default"], function (req, res) {
  var kategori = req.body.kategori;
  var meslek_id = req.body.meslek_id;
  con.query("INSERT INTO kategori (kategori,meslek_id) values (?,?)", [kategori, meslek_id], function (err, result) {
    if (err) {
      throw err;
    }
    res.send("Kategori eklendi");
  });
});
router["delete"]("/category", _auth["default"], function (req, res) {
  var id = req.body.id;
  con.query("DELETE FROM kategori WHERE id = ? ", id, function (err) {
    if (err) {
      throw err;
    }
    res.send("Basarili bir sekilde silindi");
  });
});
module.exports = router;