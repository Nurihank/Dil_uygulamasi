"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mysql = _interopRequireDefault(require("mysql"));
var _util = _interopRequireDefault(require("util"));
var _bodyParser = _interopRequireWildcard(require("body-parser"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = require("express").Router(); //routerları export etmek için   

var userModel = require("../model/userModel");

/* var db =  require("../model/database")
var db = db.database

var getDb = new db()


var baglanti = mysql.createConnection({
    host:getDb.getHost,
    user:getDb.getUser,
    password:getDb.getPassword,
    database:getDb.getDataBase
    })

    baglanti.connect((err)=>{
        if(err){
            throw err
        }else{
            console.log("Connection Successful")
        }
    })


const query = util.promisify(baglanti.query).bind(baglanti); */ //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık
function userEmail(_x) {
  return _userEmail.apply(this, arguments);
}
function _userEmail() {
  _userEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(email) {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?", email);
        case 2:
          result = _context8.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", true);
        case 8:
          return _context8.abrupt("return", false);
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _userEmail.apply(this, arguments);
}
function userPassword(_x2) {
  return _userPassword.apply(this, arguments);
}
function _userPassword() {
  _userPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(şifre) {
    var passwordToken, result, sayiString;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          passwordToken = (0, _md["default"])(şifre);
          _context9.next = 3;
          return query("SELECT COUNT(*) as sayi FROM kullanici WHERE şifre = ?", passwordToken);
        case 3:
          result = _context9.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", true);
        case 9:
          return _context9.abrupt("return", false);
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _userPassword.apply(this, arguments);
}
router.post("/signup", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var kullaniciAdi, sifre, email, getUserInfo, userInfo, isUserExist, isEmailExist, passwordToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          sifre = req.body.sifre;
          email = req.body.email;
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context.next = 7;
          return userInfo.userFind(kullaniciAdi);
        case 7:
          isUserExist = _context.sent;
          _context.next = 10;
          return userEmail(email);
        case 10:
          isEmailExist = _context.sent;
          passwordToken = (0, _md["default"])(sifre);
          if (isUserExist == false) {
            if (isEmailExist == false) {
              baglanti.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)", [kullaniciAdi, passwordToken, email], function (err) {
                if (err) throw err;
                res.json({
                  status: "SUCCES",
                  message: "Başarili bir şekilde kayit oldun"
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
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/signin", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var kullaniciAdi, sifre, passwordToken, getUserInfo, userInfo, isUserExist, user, accessToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          sifre = req.body.sifre;
          passwordToken = (0, _md["default"])(sifre);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context2.next = 7;
          return userInfo.userFind(kullaniciAdi);
        case 7:
          isUserExist = _context2.sent;
          _context2.next = 10;
          return userInfo.userInfo(kullaniciAdi);
        case 10:
          user = _context2.sent;
          if (isUserExist == true) {
            if (passwordToken == user[0].şifre) {
              accessToken = _jsonwebtoken["default"].sign({
                kullaniciAdi: user[0].kullaniciAdi,
                email: user[0].email
              }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m"
              });
              baglanti.query("UPDATE kullanici SET accesToken = ? WHERE kullaniciAdi = ? ", [accessToken, kullaniciAdi]);
              res.json({
                message: "Basarili bir sekilde giris yaptiniz",
                accesToken: accessToken
              });
            } else {
              res.json({
                status: "FAILED",
                message: "Kullanici adi ve ya şifre hatalidir"
              });
            }
          } else {
            res.send({
              status: "FAILED",
              message: "Kullanici adi ve ya şifre hatalidir"
            });
          }
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/forgetPasswordCode", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var kullaniciAdi, email, getUserInfo, userInfo, isUserExist, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          email = req.body.email; // const yeniSifre = req.body.yeniSifre
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context4.next = 6;
          return userInfo.userFind(kullaniciAdi);
        case 6:
          isUserExist = _context4.sent;
          _context4.next = 9;
          return userInfo.userInfo(kullaniciAdi);
        case 9:
          user = _context4.sent;
          if (isUserExist == true) {
            baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result) {
              var emailMatch = JSON.parse(JSON.stringify(result));
              if (user[0].email == email) {
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
                  return function codeUret(_x9, _x10) {
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
                  to: "kavalcinurihan@gmail.com",
                  //email yapılacak
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
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/forgetPassword", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var kullaniciAdi, code, newPassword, codeToken, getUserInfo, userInfo, isUserExist, newPasswordToken;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          codeToken = (0, _md["default"])(code);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context5.next = 8;
          return userInfo.userFind(kullaniciAdi);
        case 8:
          isUserExist = _context5.sent;
          newPasswordToken = (0, _md["default"])(newPassword);
          if (isUserExist == true) {
            baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", [kullaniciAdi], function (err, result) {
              if (err) {
                throw err;
              } else {
                var jsonResult = JSON.parse(JSON.stringify(result));
                var codeDtToken = result[0].forgetPasswordToken;
                if (codeToken == codeDtToken) {
                  baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?", [newPasswordToken, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    } else {
                      res.send({
                        message: "Şifre değiştirildi"
                      });
                    }
                  });
                } else {
                  res.json({
                    message: "Yanlis veya eksik kod"
                  });
                }
              }
            });
          } else {
            res.json({
              message: "Kullanici adi hatali veya eksiktir"
            });
          }
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/changePasswordCode", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var kullaniciAdi, oldPassword, email, oldPasswordToken, getUserInfo, userInfo, isUserExist, user, code, codeToken, transporter;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          //DÜZELT ŞİFRE SIKINTILI
          kullaniciAdi = req.body.kullaniciAdi;
          oldPassword = req.body.oldPassword;
          email = req.body.email;
          oldPasswordToken = (0, _md["default"])(oldPassword);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context6.next = 8;
          return userInfo.userFind(kullaniciAdi);
        case 8:
          isUserExist = _context6.sent;
          _context6.next = 11;
          return userInfo.userInfo(kullaniciAdi);
        case 11:
          user = _context6.sent;
          code = "1001";
          codeToken = (0, _md["default"])(code);
          if (isUserExist == true && user[0].şifre == oldPassword) {
            transporter = _nodemailer["default"].createTransport({
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
            baglanti.query("UPDATE kullanici SET changePasswordToken = ? WHERE kullaniciAdi = ? ", [codeToken, kullaniciAdi]);
          } else {
            res.json({
              message: "Yanliş kullanici adi ve ya şifre"
            });
          }
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
router.put("/changePassword", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var kullaniciAdi, code, newPassword, getUserInfo, userInfo, isUserExist, codeToken, newPasswordToken;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context7.next = 7;
          return userInfo.userFind();
        case 7:
          isUserExist = _context7.sent;
          codeToken = (0, _md["default"])(code);
          newPasswordToken = (0, _md["default"])(newPassword);
          if (isUserExist == true) {
            baglanti.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", [kullaniciAdi], function (err, result) {
              if (result[0].changePasswordToken == codeToken) {
                baglanti.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ", [newPasswordToken, kullaniciAdi], function (err) {
                  if (err) {
                    throw err;
                  }
                });
                res.json({
                  message: "Sifre degistirilmistir"
                });
              } else {
                res.json({
                  message: "Yanlis ve ya eksik kod"
                });
              }
            });
          } else {
            res.send({
              message: "Böyle bir kullanici yoktur"
            });
          }
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}());
module.exports = router;