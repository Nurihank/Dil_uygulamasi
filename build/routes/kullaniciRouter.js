"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("mysql"));
var _util = _interopRequireDefault(require("util"));
var _bodyParser = _interopRequireWildcard(require("body-parser"));
var _express = _interopRequireDefault(require("express"));
var _crypto = _interopRequireDefault(require("crypto"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = require("express").Router();
//crypto nedir araştır bak ve procademy den kurslara bak modeller vb

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
var baglanti = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "15935738a",
  database: "ingilizce_uygulamasi"
});
baglanti.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connection Successful");
  }
});
var query = _util["default"].promisify(baglanti.query).bind(baglanti); //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık
function userFind(_x) {
  return _userFind.apply(this, arguments);
}
function _userFind() {
  _userFind = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(kullaniciAdi) {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi);
        case 2:
          result = _context6.sent;
          sayiString = JSON.parse(JSON.stringify(result)); //console.log(sayiString[0].sayi)
          if (!sayiString[0].sayi) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", true);
        case 8:
          return _context6.abrupt("return", false);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _userFind.apply(this, arguments);
}
function userEmail(_x2) {
  return _userEmail.apply(this, arguments);
}
function _userEmail() {
  _userEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(email) {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?", email);
        case 2:
          result = _context7.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context7.next = 8;
            break;
          }
          return _context7.abrupt("return", true);
        case 8:
          return _context7.abrupt("return", false);
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _userEmail.apply(this, arguments);
}
function userPassword(_x3) {
  return _userPassword.apply(this, arguments);
}
function _userPassword() {
  _userPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(şifre) {
    var passwordToken, result, sayiString;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          passwordToken = (0, _md["default"])(şifre);
          _context8.next = 3;
          return query("SELECT COUNT(*) as sayi FROM kullanici WHERE şifre = ?", passwordToken);
        case 3:
          result = _context8.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", true);
        case 9:
          return _context8.abrupt("return", false);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _userPassword.apply(this, arguments);
}
global.check;
router.post("/signup", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var kullaniciAdi, sifre, email, isUserExist, isEmailExist, passwordToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          sifre = req.body.sifre;
          email = req.body.email;
          _context.next = 5;
          return userFind(kullaniciAdi);
        case 5:
          isUserExist = _context.sent;
          _context.next = 8;
          return userEmail(email);
        case 8:
          isEmailExist = _context.sent;
          passwordToken = (0, _md["default"])(sifre); //console.log(isUserExist)
          if (isUserExist == false) {
            //console.log(isEmailExist)
            if (isEmailExist == false) {
              baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)", [kullaniciAdi, passwordToken, email], function (err) {
                if (err) throw err;
                res.json({
                  status: "SUCCES",
                  message: "Başarili bir şekilde kayit oldun"
                  //accessToken:passwordToken
                });
              });
            } else {
              res.json({
                status: "FAILED",
                message: "Böyle bir e posta vardir"
              });
            }
          } else {
            res.json({
              status: "FAILED",
              message: "Böyle bir kullanici adi vardir"
            });
          }
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/signin", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var kullaniciAdi, sifre, passwordToken, isUserExist, sifreDT;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          sifre = req.body.sifre;
          passwordToken = (0, _md["default"])(sifre);
          _context2.next = 5;
          return userFind(kullaniciAdi);
        case 5:
          isUserExist = _context2.sent;
          _context2.next = 8;
          return userPassword(sifre);
        case 8:
          sifreDT = _context2.sent;
          if (isUserExist == true && sifreDT == true) {
            res.json({
              status: "SUCCES",
              message: "Basarili bir sekilde giris yaptini<"
            });
          } else {
            res.json({
              status: "FAILED",
              message: "Kullanici adi ve ya sifre hatali"
            });
          }
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());
router.put("/meslekDilSecimi", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var meslek = req.body.meslek;
  var dil = req.body.dil;
  var sectigiDil = req.body.sectigiDil;
  baglanti.query("SELECT * FROM kullanici", function (err, result) {
    var kullaniciAdiString = JSON.parse(JSON.stringify(result));
    if (err) {
      throw err;
    } else {
      for (var i = 0; i < kullaniciAdiString.length; i++) {
        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM meslek", function (err, result) {
            if (err) {
              throw err;
            } else {
              var meslekIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < meslekIdString.length; i++) {
                console.log(meslekIdString[0].Meslek);
                if (meslek == meslekIdString[i].Meslek) {
                  var idJop = meslekIdString[i].idMeslek;
                  baglanti.query("UPDATE kullanici SET MeslekID = ? WHERE kullaniciAdi = ?", [idJop, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    } else {
                      res.send("Guncellendi");
                    }
                  });
                }
                /* else{
                    res.send("Böyle bir meslek bulunamadi")
                } */
              }
            }
          });
        }

        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM dil", function (err, result) {
            if (err) {
              throw err;
            } else {
              var dilIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < dilIdString.length; i++) {
                if (dil == dilIdString[i].Dil) {
                  console.log(dilIdString[i].Dil);
                  var idDil = dilIdString[i].idDil;
                  baglanti.query("UPDATE kullanici SET DilID = ? WHERE kullaniciAdi = ?", [idDil, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
            }
          });
        }
        if (kullaniciAdiString[i].kullaniciAdi == kullaniciAdi) {
          baglanti.query("SELECT * FROM dil", function (err, result) {
            if (err) {
              throw err;
            } else {
              var SectigidilIdString = JSON.parse(JSON.stringify(result));
              for (var i = 0; i < SectigidilIdString.length; i++) {
                if (sectigiDil == SectigidilIdString[i].Dil) {
                  console.log(SectigidilIdString[i].Dil);
                  var idDil = SectigidilIdString[i].idDil;
                  baglanti.query("UPDATE kullanici SET SectigiDilID = ? WHERE kullaniciAdi = ?", [idDil, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
  });
});
router.post("/forgetPasswordCode", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var kullaniciAdi, email, isUserExist, isEmailExist;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          email = req.body.email; // const yeniSifre = req.body.yeniSifre
          _context4.next = 4;
          return userFind(kullaniciAdi);
        case 4:
          isUserExist = _context4.sent;
          _context4.next = 7;
          return userEmail(email);
        case 7:
          isEmailExist = _context4.sent;
          if (isUserExist == true) {
            baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result) {
              var emailMatch = JSON.parse(JSON.stringify(result));
              if (emailMatch[0].email == email) {
                var codeUret = /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(min, max) {
                    var sayi;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          sayi = "";
                          sayi = Math.floor(Math.random() * (max - min)) + min;
                          return _context3.abrupt("return", sayi);
                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function codeUret(_x10, _x11) {
                    return _ref4.apply(this, arguments);
                  };
                }();
                var code = "1000";
                var codeToken = (0, _md["default"])(code);
                var transporter = _nodemailer["default"].createTransport({
                  host: "smtp.gmail.com",
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'kavalcinurihan@gmail.com',
                    pass: 'lfxtfgzyiserimdn'
                  },
                  postman: res.json({
                    message: "Code gönderildi"
                  })
                });
                transporter.sendMail({
                  from: '"You" <kavalcinurihan@gmail.com>',
                  to: email,
                  subject: "VERIFICATION CODE",
                  html: code
                });
                baglanti.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE kullaniciAdi= ? ", [codeToken, kullaniciAdi], function (err) {
                  if (err) {
                    throw err;
                  } else {}
                });
              } else {
                res.json({
                  succes: "FAILED",
                  message: "Kullanici adi ve email eşleşmiyo"
                });
              }
            });
          } else {
            res.json({
              status: "FAILED",
              message: "Kullanici adi hatalidir"
            });
          }
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/forgetPassword", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var kullaniciAdi, code, newPassword, codeToken, isUserExist;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          codeToken = (0, _md["default"])(code);
          _context5.next = 6;
          return userFind(kullaniciAdi);
        case 6:
          isUserExist = _context5.sent;
          if (isUserExist == true) {
            baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", [kullaniciAdi], function (err, result) {
              if (err) {
                throw err;
              } else {
                var jsonResult = JSON.parse(JSON.stringify(result));
                console.log(jsonResult[0].forgetPasswordToken);
                var codeDtToken = result[0].forgetPasswordToken;
                if (codeToken == codeDtToken) {
                  baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?", [newPassword, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    } else {
                      res.send("Şifre değiştirildi");
                    }
                  });
                } else {
                  res.send("Yanlis ve ya eksik kod");
                }
              }
            });
          } else {
            res.send("Böyle bir kullanici adi yoktur");
          }
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
global.check1;
router.put("/changePassword", function (req, res) {
  var kullaniciAdi = req.body.kullaniciAdi;
  var sifre = req.body.sifre;
  var newPassword = req.body.newPassword;
  var passwordToken = (0, _md["default"])(sifre);
  var newPasswordToken = (0, _md["default"])(newPassword);
  baglanti.query("SELECT * FROM kullanici", function (err, result) {
    var kullaniciAdiSifre = JSON.parse(JSON.stringify(result));
    for (var i = 0; i < kullaniciAdiSifre.length; i++) {
      if (kullaniciAdiSifre[i].kullaniciAdi == kullaniciAdi && kullaniciAdiSifre[i].şifre == passwordToken) {
        global.check1 = true;
      } else {
        global.check1 = false;
      }
    }
    if (global.check1 == true) {
      baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ", [newPasswordToken, kullaniciAdi], function (err, result) {
        res.send("Sifreni başarili bir şekilde degistirdin");
      });
    } else {
      res.send("Yanliş şifre ya da kullanici adi girdiniz");
    }
  });
});
module.exports = router;