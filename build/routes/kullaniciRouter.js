"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _util = _interopRequireDefault(require("util"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var router = require("express").Router(); //routerları export etmek için   

var userMiddleware = require("../middlewares/user");
var userModel = require("../model/userModel");
var db = require("../model/database");
var getDb = new db();
getDb.connect();
var con = getDb.getConnection();
var query = _util["default"].promisify(con.query).bind(con); //mysql in sürümü asenkron awaiti desteklemediği için böyle bir kod yazdık
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
router.post("/signup", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var con, kullaniciAdi, sifre, email, getUserInfo, userInfo, isUserExist, isEmailExist, passwordToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          sifre = req.body.sifre;
          email = req.body.email; //react nativeden post isteği gönderirken direkt gönderirsen body ile alabilirsin 
          //ama ör:mahir { } ile gönderirsen req.body.mahir.kullaniciAdi ile erişirsin
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context.next = 8;
          return userInfo.userFind(kullaniciAdi);
        case 8:
          isUserExist = _context.sent;
          _context.next = 11;
          return userEmail(email);
        case 11:
          isEmailExist = _context.sent;
          passwordToken = (0, _md["default"])(sifre);
          if (isUserExist == false) {
            if (isEmailExist == false) {
              con.query("INSERT INTO kullanici (kullaniciAdi,şifre,email) values (?,?,?)", [kullaniciAdi, passwordToken, email], function (err) {
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
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/signin", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var con, kullaniciAdi, sifre, passwordToken, getUserInfo, userInfo, isUserExist, user, accessToken, refreshToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.query.kullaniciAdi;
          sifre = req.query.sifre; //react native'de get metodu gönderirken params ile göndercez burdan query metodu olarak alabiliz 
          passwordToken = (0, _md["default"])(sifre);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context2.next = 8;
          return userInfo.userFind(kullaniciAdi);
        case 8:
          isUserExist = _context2.sent;
          _context2.next = 11;
          return userInfo.userInfo(kullaniciAdi);
        case 11:
          user = _context2.sent;
          if (isUserExist == true) {
            if (passwordToken == user[0].şifre) {
              accessToken = _jsonwebtoken["default"].sign({
                id: user[0].id,
                kullaniciAdi: user[0].kullaniciAdi,
                email: user[0].email
              }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "5m"
              });
              refreshToken = _jsonwebtoken["default"].sign({
                id: user[0].id,
                kullaniciAdi: user[0].kullaniciAdi,
                email: user[0].email
              }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "2m"
              });
              con.query("UPDATE kullanici SET accesToken = ? WHERE kullaniciAdi = ? ", [accessToken, kullaniciAdi]);
              res.json({
                message: "Basarili bir sekilde giris yaptiniz",
                accessToken: accessToken,
                refreshToken: refreshToken,
                status: "SUCCES",
                id: user[0].id
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
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/forgetPasswordCode", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var con, kullaniciAdi, email, getUserInfo, userInfo, isUserExist, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.query.kullaniciAdi;
          email = req.query.email;
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context4.next = 7;
          return userInfo.userFind(kullaniciAdi);
        case 7:
          isUserExist = _context4.sent;
          _context4.next = 10;
          return userInfo.userInfo(kullaniciAdi);
        case 10:
          user = _context4.sent;
          if (kullaniciAdi == "" || email == "") {
            res.json({
              status: "FAILED"
            });
          } else {
            if (isUserExist == true) {
              con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", kullaniciAdi, function (err, result) {
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
                    return function codeUret(_x8, _x9) {
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
                  con.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE kullaniciAdi= ? ", [codeToken, kullaniciAdi], function (err) {
                    if (err) {
                      throw err;
                    } else {}
                  });
                } else {
                  res.json({
                    status: "FAILED",
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
          }
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/forgetPassword", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var con, kullaniciAdi, code, newPassword, codeToken, getUserInfo, userInfo, isUserExist, newPasswordToken;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          codeToken = (0, _md["default"])(code);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context5.next = 9;
          return userInfo.userFind(kullaniciAdi);
        case 9:
          isUserExist = _context5.sent;
          newPasswordToken = (0, _md["default"])(newPassword);
          if (isUserExist == true) {
            con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ?", [kullaniciAdi], function (err, result) {
              if (err) {
                throw err;
              } else {
                var jsonResult = JSON.parse(JSON.stringify(result));
                var codeDtToken = result[0].forgetPasswordToken;
                if (codeToken == codeDtToken) {
                  con.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ?", [newPasswordToken, kullaniciAdi], function (err) {
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
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/changePasswordCode", userMiddleware, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var con, kullaniciAdi, oldPassword, email, oldPasswordToken, getUserInfo, userInfo, isUserExist, user, code, codeToken, transporter;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          oldPassword = req.body.oldPassword;
          email = req.body.email;
          oldPasswordToken = (0, _md["default"])(oldPassword);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context6.next = 9;
          return userInfo.userFind(kullaniciAdi);
        case 9:
          isUserExist = _context6.sent;
          _context6.next = 12;
          return userInfo.userInfo(kullaniciAdi);
        case 12:
          user = _context6.sent;
          code = "1001";
          codeToken = (0, _md["default"])(code);
          if (isUserExist == true && user[0].şifre == oldPasswordToken) {
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
            con.query("UPDATE kullanici SET changePasswordToken = ? WHERE kullaniciAdi = ? ", [codeToken, kullaniciAdi]);
          } else {
            res.json({
              message: "Yanliş kullanici adi ve ya şifre"
            });
          }
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}());
router.put("/changePassword", userMiddleware, /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var con, kullaniciAdi, code, newPassword, getUserInfo, userInfo, isUserExist, codeToken, newPasswordToken;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context7.next = 8;
          return userInfo.userFind();
        case 8:
          isUserExist = _context7.sent;
          codeToken = (0, _md["default"])(code);
          newPasswordToken = (0, _md["default"])(newPassword);
          if (isUserExist == true) {
            con.query("SELECT * FROM kullanici WHERE kullaniciAdi = ? ", [kullaniciAdi], function (err, result) {
              if (result[0].changePasswordToken == codeToken) {
                con.query("UPDATE kullanici SET şifre = ? WHERE kullaniciAdi = ? ", [newPasswordToken, kullaniciAdi], function (err) {
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
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}());
router.get("/meslek", function (req, res) {
  var con = getDb.getConnection();
  con.query("SELECT * FROM meslek", function (err, result) {
    res.json({
      result: result
    });
  });
});
router.post("/meslekSecim", function (req, res) {
  var meslek = req.body.meslek;
  var id = req.body.id;
  var con = getDb.getConnection();
  con.query("UPDATE kullanici SET MeslekID = ? WHERE id = ? ", [meslek, id], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({
      STATUS: "SUCCES"
    });
  });
});
router.get("/dil", function (req, res) {
  var con = getDb.getConnection();
  con.query("SELECT * FROM dil", function (err, result) {
    res.json({
      result: result
    });
  });
});
router.post("/dilSecim", function (req, res) {
  var dil = req.body.dil;
  var id = req.body.id;
  var con = getDb.getConnection();
  con.query("UPDATE kullanici SET DilID = ? WHERE id = ? ", [dil, id], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({
      STATUS: "SUCCES"
    });
  });
});
router.post("/sectigiDilSecim", function (req, res) {
  var sectigiDil = req.body.sectigiDil;
  var id = req.body.id;
  var con = getDb.getConnection();
  con.query("UPDATE kullanici SET SectigiDilID = ? WHERE id = ? ", [sectigiDil, id], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({
      STATUS: "SUCCES"
    });
  });
});
router.get("/user/:id", function (req, res) {
  var id = req.params.id;
  var con = getDb.getConnection();
  con.query("SELECT * FROM kullanici WHERE id = ?", [id], function (err, result) {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
router.post("/DilSeviyesi", function (req, res) {
  var con = getDb.getConnection();
  var dilSeviyesi = req.body.sectigiDil;
  var id = req.body.id;
  con.query("Update kullanici SET dilSeviyesi = ? WHERE id = ?", [dilSeviyesi, id], function (err, result) {
    if (err) throw err;
    res.json({
      status: "SUCCES"
    });
  });
});
router.post("/NedenOgreniyor", function (req, res) {
  var con = getDb.getConnection();
  var nedenOgreniyor = req.body.nedenOgreniyor;
  var id = req.body.id;
  con.query("Update kullanici SET nedenOgreniyor = ? WHERE id = ?", [nedenOgreniyor, id], function (err, result) {
    if (err) throw err;
    res.json({
      status: "SUCCES"
    });
  });
});
router.get("/KullaniciBilgileri", userMiddleware, function (req, res) {
  var id = req.query.id;
  if (!id) {
    return res.status(400).json({
      error: "ID is required"
    });
  }
  var con = getDb.getConnection();
  var kullaniciAdi = null;
  var email = null;
  var meslek = null;
  var dil = null;
  var OgrenilecekDil = null;
  var user = [{
    id: id,
    kullaniciAdi: kullaniciAdi,
    email: email,
    meslek: meslek,
    dil: dil,
    OgrenilecekDil: OgrenilecekDil
  }];
  con.query("SELECT kullaniciAdi, meslek, email FROM kullanici INNER JOIN meslek ON kullanici.MeslekID = meslek.idMeslek WHERE kullanici.id = ?", [id], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: "Database query failed"
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        error: "User not found"
      });
    }
    user[0].meslek = result[0].meslek;
    user[0].kullaniciAdi = result[0].kullaniciAdi;
    user[0].email = result[0].email;
    con.query("SELECT dil_adi FROM kullanici INNER JOIN dil ON kullanici.DilID = dil.id WHERE kullanici.id = ?", [id], function (err, result) {
      if (err) {
        return res.status(500).json({
          error: "Database query failed"
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: "Language not found"
        });
      }
      user[0].dil = result[0].dil_adi;
      con.query("SELECT dil_adi FROM kullanici INNER JOIN dil ON kullanici.SectigiDilID = dil.id WHERE kullanici.id = ?", [id], function (err, result) {
        if (err) {
          return res.status(500).json({
            error: "Database query failed"
          });
        }
        if (result.length === 0) {
          return res.status(404).json({
            error: "Selected language not found"
          });
        }
        user[0].OgrenilecekDil = result[0].dil_adi;
        res.json({
          user: user
        });
      });
    });
  });
});
module.exports = router;