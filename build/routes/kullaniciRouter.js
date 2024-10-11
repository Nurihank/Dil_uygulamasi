"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _util = _interopRequireDefault(require("util"));
var _md = _interopRequireDefault(require("md5"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _express = require("express");
var _console = require("console");
var _bcryptjs = require("bcryptjs");
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
  _userEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(email) {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?", email);
        case 2:
          result = _context10.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          if (!(sayiString[0].sayi == 1)) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", true);
        case 8:
          return _context10.abrupt("return", false);
        case 9:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
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
                id: user[0].id
              }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30s"
              });
              refreshToken = _jsonwebtoken["default"].sign({
                id: user[0].id
              }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "10m"
              });
              con.query("UPDATE kullanici SET accesToken = ? , refreshToken = ? WHERE kullaniciAdi = ? ", [accessToken, refreshToken, kullaniciAdi]);
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
  console.log(id);
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
router.get("/Kullanici", function (req, res) {
  var id = req.query.id;
  if (!id) {
    return res.status(400).json({
      error: "ID is required"
    });
  }
  var con = getDb.getConnection();
  con.query("SELECT * FROM kullanici WHERE id = ?", [id], function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
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
    con.query("SELECT LocalName FROM kullanici INNER JOIN dil ON kullanici.DilID = dil.DilID WHERE kullanici.id = ?", [id], function (err, result) {
      if (err) {
        return res.status(500).json({
          error: "Database query failedd"
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: "Language not found"
        });
      }
      user[0].dil = result[0].LocalName;
      con.query("SELECT LocalName FROM kullanici INNER JOIN dil ON kullanici.SectigiDilID = dil.DilID WHERE kullanici.id = ?", [id], function (err, result) {
        if (err) {
          return res.status(500).json({
            error: "Database query faileddd"
          });
        }
        if (result.length === 0) {
          return res.status(404).json({
            error: "Selected language not found"
          });
        }
        user[0].OgrenilecekDil = result[0].LocalName;
        res.json({
          user: user
        });
      });
    });
  });
});
router.put("/NewAccessToken", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var con, id, refreshToken;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return getDb.getConnection();
        case 2:
          con = _context9.sent;
          // Bağlantıyı al
          id = req.body.id; // ID'yi query parametrelerinden al
          refreshToken = req.body.refreshToken; // Refresh token'ı query parametrelerinden al
          try {
            // Kullanıcının refresh token'ını kontrol et
            con.query("SELECT * FROM kullanici WHERE id = ?", [id], /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(err, result) {
                var DbRefreshToken;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!err) {
                        _context8.next = 3;
                        break;
                      }
                      console.error("Veritabanı sorgu hatası:", err);
                      return _context8.abrupt("return", res.status(500).json({
                        message: "Veritabanı hatası"
                      }));
                    case 3:
                      if (!(result.length === 0)) {
                        _context8.next = 5;
                        break;
                      }
                      return _context8.abrupt("return", res.status(404).json({
                        message: "Kullanıcı bulunamadı"
                      }));
                    case 5:
                      DbRefreshToken = result[0].refreshToken; // Refresh token'ı kontrol et 
                      if (!(!DbRefreshToken || DbRefreshToken !== refreshToken)) {
                        _context8.next = 8;
                        break;
                      }
                      return _context8.abrupt("return", res.status(403).json({
                        message: "Geçersiz refresh token"
                      }));
                    case 8:
                      // Refresh token'ın süresini kontrol et
                      _jsonwebtoken["default"].verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err) {
                        if (err) {
                          return res.status(403).json({
                            message: "Refresh token süresi dolmuş veya geçersiz"
                          });
                        }

                        // Yeni access token oluştur
                        var accessToken = _jsonwebtoken["default"].sign({
                          id: id
                        }, process.env.ACCESS_TOKEN_SECRET, {
                          expiresIn: "30s"
                        });

                        // Yeni access token'ı veritabanında güncelle
                        con.query("UPDATE kullanici SET accesToken = ? WHERE id = ?", [accessToken, id], function (err) {
                          if (err) {
                            console.error("Veritabanı güncelleme hatası:", err);
                            return res.status(500).json({
                              message: "Veritabanı hatası"
                            });
                          }
                          res.json({
                            accessToken: accessToken
                          });
                        });
                      });
                    case 9:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              return function (_x18, _x19) {
                return _ref9.apply(this, arguments);
              };
            }());
          } catch (error) {
            console.error("Hata:", error);
            res.status(500).json({
              message: "Sunucu hatası"
            });
          }
        case 6:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}());
router.get("/Seviye", function (req, res) {
  //seviye sezon bölüm bunları order'ına göre sıralama yapsın
  var con = getDb.getConnection();
  con.query("SELECT * FROM seviye ORDER BY seviye.Order", function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
router.get("/Sezon", function (req, res) {
  var SeviyeID = req.query.SeviyeID;
  var HangiDilID = req.query.HangiDilID;
  var con = getDb.getConnection();
  con.query("SELECT ceviriler.Ceviri, SezonID ,sezon.Order FROM sezon INNER JOIN ceviriler ON sezon.CeviriID = ceviriler.CevirilerID where sezon.SeviyeID = ? AND ceviriler.HangiDilID = ? ORDER BY sezon.Order;", [SeviyeID, HangiDilID], function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
router.get("/Bolum", function (req, res) {
  var SezonID = req.query.SezonID;
  var HangiDilID = req.query.HangiDilID;
  var con = getDb.getConnection();
  con.query("SELECT BolumID, ceviriler.Ceviri,bolum.Order  FROM bolum INNER JOIN ceviriler ON bolum.CeviriID = ceviriler.CevirilerID WHERE bolum.SezonID = ? AND ceviriler.HangiDilID = ? ORDER BY bolum.Order;", [SezonID, HangiDilID], function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
router.get("/Oyun", function (req, res) {
  var BolumID = req.query.BolumID;
  var con = getDb.getConnection();
  con.query("SELECT anakelimeler.AnaKelimelerID , ceviriler.AnaKelimeID , anakelimeler.value , ceviriler.ceviri FROM anakelimeler INNER JOIN ceviriler ON anakelimeler.AnaKelimelerID = ceviriler.AnaKelimeID WHERE anakelimeler.BolumID = ? AND anakelimeler.test = 1", [BolumID], function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
router.get("/Egitim", function (req, res) {
  //eğitimde bir de kullanıcının meslek diline göre diline göre getirmeyi de kontoırl et
  var SeviyeID = req.query.SeviyeID;
  var con = getDb.getConnection();
  con.query(" SELECT ak.AnaKelimelerID , ak.Value , c.Ceviri FROM anakelimeler ak JOIN bolum b ON ak.BolumID = b.BolumID JOIN sezon s ON b.SezonID = s.SezonID JOIN ceviriler c ON ak.AnaKelimelerID = c.AnakelimeID WHERE ak.test = 1 AND s.SeviyeID = ?", [SeviyeID], function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
router.post("/SozlugeKelimeEkleme", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var AnaKelimeID = req.body.AnaKelimeID;
  con.query("SELECT COUNT(*) AS count FROM sozluk WHERE kullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, AnaKelimeID], function (err, result) {
    if (err) throw err;

    // 'count' sütun adıyla sonuç al
    var count = result[0].count;
    console.log('Count:', count); // Count değerini ekrana yazdır

    if (count > 0) {
      res.json({
        message: "Bu Kelime Zaten Sözlüğünde Var"
      });
    } else {
      con.query("INSERT INTO sozluk (KullaniciID, AnaKelimeID) VALUES (?, ?)", [KullaniciID, AnaKelimeID], function (err, result) {
        if (err) throw err;
        res.json({
          message: "Başarıyla Eklendi"
        });
      });
    }
  });
});
router["delete"]("/SozluktenKelimeSilme", function (req, res) {
  var KullaniciID = req.query.KullaniciID;
  var KelimeID = req.query.KelimeID;
  console.log(KelimeID);
  con.query("DELETE FROM sozluk WHERE KullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, KelimeID], function (err, result) {
    if (err) {
      // Hata durumunda hata mesajını geri döndür
      return res.status(500).json({
        error: "Veritabanı hatası"
      });
    }

    // Etkilenen satır sayısını kontrol et
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Kelime bulunamadı veya zaten silinmiş"
      });
    }

    // Silme işlemi başarılıysa
    res.json({
      message: "Kelime başarıyla silindi"
    });
  });
});
router.get("/SozluguGetir", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  con.query("SELECT sozluk.SozlukID,anakelimeler.AnaKelimelerID, anakelimeler.Value,ceviriler.Ceviri FROM sozluk INNER JOIN anakelimeler ON sozluk.AnaKelimeID = anakelimeler.AnaKelimelerID INNER JOIN ceviriler ON ceviriler.AnaKelimeID = anakelimeler.AnaKelimelerID WHERE sozluk.KullaniciID = ?", [KullaniciID], function (err, result) {
    if (err) throw err;
    res.json({
      message: result
    });
  });
});
router.get("/SozlugeEkliMi", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var KelimeID = req.query.KelimeID;
  con.query("SELECT COUNT(*) AS count FROM sozluk WHERE KullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, KelimeID], function (err, result) {
    var count = result[0].count;
    if (err) throw err;
    if (count > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});
router.post("/GecilenBolumlerEkle", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var BolumID = req.body.BolumID;
  con.query("SELECT COUNT(*) AS count FROM gecilenbolumler WHERE KullaniciID=? AND BolumID=?", [KullaniciID, BolumID], function (err, result) {
    if (result[0].count > 0) {
      res.json({
        message: "failed"
      });
    } else {
      con.query("INSERT INTO gecilenbolumler (KullaniciID,BolumID) VALUES (?,?)", [KullaniciID, BolumID], function (err, result) {
        if (err) throw err;
        res.json({
          message: "succes"
        });
      });
    }
  });
});
router.get("/GecilenBolumler", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var SezonID = req.query.SezonID;
  con.query("SELECT * FROM bolum INNER JOIN gecilenbolumler ON bolum.BolumID = gecilenbolumler.BolumID WHERE bolum.SezonID = ? AND gecilenbolumler.KullaniciID = ? ORDER BY bolum.Order", [SezonID, KullaniciID], function (err, result) {
    if (err) throw err;
    res.json({
      message: result
    });
  });
});
router.post("/GecilenSezonEkle", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var SezonID = req.body.SezonID;
  con.query("SELECT COUNT(*) AS count FROM gecilensezonlar WHERE KullaniciID=? AND SezonID=?", [KullaniciID, SezonID], function (err, result) {
    if (result[0].count > 0) {
      res.json({
        message: "failed"
      });
    } else {
      con.query("INSERT INTO gecilensezonlar (KullaniciID,SezonID) VALUES (?,?)", [KullaniciID, SezonID], function (err, result) {
        if (err) throw err;
        res.json({
          message: "succes"
        });
      });
    }
  });
});
router.get("/GecilenSezonlar", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var SeviyeID = req.query.SeviyeID;
  con.query("SELECT * FROM gecilensezonlar INNER JOIN sezon ON gecilensezonlar.SezonID = sezon.SezonID WHERE sezon.SeviyeID = ? AND gecilensezonlar.KullaniciID = ?", [SeviyeID, KullaniciID], function (err, result) {
    if (err) throw err;
    res.json({
      message: result
    });
  });
});
router.get("/SezonBittiMiKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var SezonID = req.query.SezonID;

  // SezonID ile bölümleri al
  con.query("SELECT * FROM bolum WHERE SezonID = ?", [SezonID], function (err, bolumlerResult) {
    if (err) {
      return res.status(500).json({
        message: "Bölümleri alırken hata oluştu."
      });
    }

    // Geçilen bölümleri al
    con.query("SELECT * FROM gecilenbolumler WHERE KullaniciID = ?", [KullaniciID], function (err, gecilenBolumlerResult) {
      if (err) {
        return res.status(500).json({
          message: "Geçilen bölümleri alırken hata oluştu."
        });
      }

      // Geçilen bölüm ID'lerini diziye çevir
      var gecilenBolumIDs = gecilenBolumlerResult.map(function (bolum) {
        return bolum.BolumID;
      });

      // Sezondaki tüm bölümlerin ID'lerini al
      var bolumIDs = bolumlerResult.map(function (bolum) {
        return bolum.BolumID;
      });

      // Tüm bölümler geçilmişse true döndür
      var sezonBittiMi = bolumIDs.every(function (bolumID) {
        return gecilenBolumIDs.includes(bolumID);
      });
      res.json({
        sezonBittiMi: sezonBittiMi
      });
    });
  });
});
module.exports = router;