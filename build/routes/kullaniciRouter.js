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
  _userEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(email) {
    var result, sayiString;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return query("Select COUNT(*) as sayi FROM kullanici WHERE email = ?", email);
        case 2:
          result = _context9.sent;
          sayiString = JSON.parse(JSON.stringify(result));
          console.log(sayiString[0].sayi);
          if (!(sayiString[0].sayi > 0)) {
            _context9.next = 9;
            break;
          }
          return _context9.abrupt("return", false);
        case 9:
          return _context9.abrupt("return", true);
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _userEmail.apply(this, arguments);
}
router.post("/signup", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var con, kullaniciAdi, eposta, sifre, getUserInfo, userInfo, isUserExist, isEmailExist, passwordToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          eposta = req.body.eposta;
          sifre = req.body.sifre;
          getUserInfo = userModel.user;
          userInfo = new getUserInfo(kullaniciAdi);
          _context.prev = 6;
          _context.next = 9;
          return userInfo.userFind(kullaniciAdi);
        case 9:
          isUserExist = _context.sent;
          _context.next = 12;
          return userEmail(eposta);
        case 12:
          isEmailExist = _context.sent;
          console.log(isUserExist);
          console.log(isEmailExist);
          if (!(!isUserExist || !isEmailExist)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            status: "FAILED",
            message: "Girdiğiniz bilgilerle kayıt oluşturulamıyor."
          }));
        case 17:
          passwordToken = (0, _md["default"])(sifre);
          con.query("INSERT INTO kullanici (kullaniciAdi, şifre, email) values (?, ?, ?)", [kullaniciAdi, passwordToken, eposta], function (err, result) {
            if (err) throw err;
            res.json({
              status: "SUCCESS",
              message: "Başarılı bir şekilde kayıt oldunuz.",
              userId: result.insertId // Eklenen kullanıcının ID'sini döndür
            });
          });
          _context.next = 24;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](6);
          res.status(500).json({
            status: "ERROR",
            message: "Bir hata oluştu."
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 21]]);
  }));
  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/signin", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var con, eposta, sifre, passwordToken;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          con = getDb.getConnection();
          eposta = req.body.eposta;
          sifre = req.body.sifre; //react native'de get metodu gönderirken params ile göndercez burdan query metodu olarak alabiliz 
          passwordToken = (0, _md["default"])(sifre);
          if (eposta && sifre) {
            // Kullanıcıyı kontrol eden SELECT sorgusu
            con.query("SELECT * FROM kullanici WHERE email = ? AND şifre = ?", [eposta, passwordToken], function (err, result) {
              if (err) {
                res.status(500).json({
                  status: "FAILED",
                  message: "Sunucu hatası meydana geldi"
                });
              } else if (result.length > 0) {
                /* kullanıcı giriş yaptı */
                var accessToken = _jsonwebtoken["default"].sign({
                  id: result[0].id
                }, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn: "30m"
                });
                var refreshToken = _jsonwebtoken["default"].sign({
                  id: result[0].id
                }, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn: "60m"
                });
                con.query("UPDATE kullanici SET accesToken = ? , refreshToken = ? WHERE id = ? ", [accessToken, refreshToken, result[0].id]);
                res.json({
                  message: "Basarili bir sekilde giris yaptiniz",
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  status: "SUCCES",
                  id: result[0].id
                });
              } else {
                // Kullanıcı bulunamadı
                res.json({
                  status: "FAILED",
                  message: "E-posta veya şifre hatalı"
                });
              }
            });
          } else {
            // E-posta veya şifre eksik
            res.json({
              status: "FAILED",
              message: "E-posta ve şifre gerekli"
            });
          }
        case 5:
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
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var con, email, codeUret, code, transporter;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          codeUret = function _codeUret(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
          };
          con = getDb.getConnection();
          email = req.query.email;
          if (email) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", res.json({
            status: "FAILED",
            message: "Email adresi gereklidir"
          }));
        case 5:
          code = codeUret(1000, 9999).toString(); // 4 haneli bir kod üretir
          //var codeToken = md5(code)
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
          _context3.next = 9;
          return transporter.sendMail({
            from: '"You" <kavalcinurihan@gmail.com>',
            to: email,
            subject: "ŞİFREMİ UNUTTUM KODU",
            html: code
          });
        case 9:
          con.query("UPDATE kullanici SET forgetPasswordToken = ? WHERE email= ? ", [code, email], function (err) {
            if (err) {
              throw err;
            }
            res.json({
              status: "SUCCESS",
              message: "Şifre sıfırlama kodu email adresinize gönderildi"
            });
          });
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/forgetPassword", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var con, kullaniciAdi, code, newPassword, codeToken, getUserInfo, userInfo, isUserExist, newPasswordToken;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          codeToken = (0, _md["default"])(code);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context4.next = 9;
          return userInfo.userFind(kullaniciAdi);
        case 9:
          isUserExist = _context4.sent;
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
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());
router.post("/changePasswordCode", userMiddleware, /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var con, kullaniciAdi, oldPassword, email, oldPasswordToken, getUserInfo, userInfo, isUserExist, user, code, codeToken, transporter;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          oldPassword = req.body.oldPassword;
          email = req.body.email;
          oldPasswordToken = (0, _md["default"])(oldPassword);
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context5.next = 9;
          return userInfo.userFind(kullaniciAdi);
        case 9:
          isUserExist = _context5.sent;
          _context5.next = 12;
          return userInfo.userInfo(kullaniciAdi);
        case 12:
          user = _context5.sent;
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
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
router.put("/changePassword", userMiddleware, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var con, kullaniciAdi, code, newPassword, getUserInfo, userInfo, isUserExist, codeToken, newPasswordToken;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          con = getDb.getConnection();
          kullaniciAdi = req.body.kullaniciAdi;
          code = req.body.code;
          newPassword = req.body.newPassword;
          getUserInfo = userModel.user; //user modelden import ediyoruz ve ordan fonk çağrıyoruz
          userInfo = new getUserInfo(kullaniciAdi);
          _context6.next = 8;
          return userInfo.userFind();
        case 8:
          isUserExist = _context6.sent;
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
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x12, _x13) {
    return _ref6.apply(this, arguments);
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
  /* bu apiyi sor */

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
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var con, id, refreshToken;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return getDb.getConnection();
        case 2:
          con = _context8.sent;
          // Bağlantıyı al
          id = req.body.id; // ID'yi query parametrelerinden al
          refreshToken = req.body.refreshToken; // Refresh token'ı query parametrelerinden al
          try {
            // Kullanıcının refresh token'ını kontrol et
            con.query("SELECT * FROM kullanici WHERE id = ?", [id], /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err, result) {
                var DbRefreshToken;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!err) {
                        _context7.next = 3;
                        break;
                      }
                      console.error("Veritabanı sorgu hatası:", err);
                      return _context7.abrupt("return", res.status(500).json({
                        message: "Veritabanı hatası"
                      }));
                    case 3:
                      if (!(result.length === 0)) {
                        _context7.next = 5;
                        break;
                      }
                      return _context7.abrupt("return", res.status(404).json({
                        message: "Kullanıcı bulunamadı"
                      }));
                    case 5:
                      DbRefreshToken = result[0].refreshToken; // Refresh token'ı kontrol et 
                      if (!(!DbRefreshToken || DbRefreshToken !== refreshToken)) {
                        _context7.next = 8;
                        break;
                      }
                      return _context7.abrupt("return", res.status(403).json({
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
                          console.log("Yeni accestoken oluşturuldu");
                          res.json({
                            accessToken: accessToken
                          });
                        });
                      });
                    case 9:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              return function (_x16, _x17) {
                return _ref8.apply(this, arguments);
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
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x14, _x15) {
    return _ref7.apply(this, arguments);
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

//oyunun sorgusunu düzlet
router.get("/Oyun", function (req, res) {
  var BolumID = req.query.BolumID;
  var con = getDb.getConnection();
  con.query("SELECT anakelimeler.AnaKelimelerID , ceviriler.AnaKelimeID , anakelimeler.value , ceviriler.ceviri FROM anakelimeler INNER JOIN ceviriler ON anakelimeler.AnaKelimelerID = ceviriler.AnaKelimeID WHERE anakelimeler.BolumID = ? AND anakelimeler.test = 1 ", [BolumID], function (err, result) {
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
  var Date = req.body.Date;
  console.log(Date);
  con.query("SELECT COUNT(*) AS count FROM sozluk WHERE kullaniciID = ? AND AnaKelimeID = ?", [KullaniciID, AnaKelimeID], function (err, result) {
    if (err) throw err;

    // 'count' sütun adıyla sonuç al
    var count = result[0].count;
    if (count > 0) {
      res.json({
        message: "Bu Kelime Zaten Sözlüğünde Var"
      });
    } else {
      con.query("INSERT INTO sozluk (KullaniciID, AnaKelimeID,Tarih) VALUES (?, ?,?)", [KullaniciID, AnaKelimeID, Date], function (err, result) {
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
router.post("/OynananOyun", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var BolumID = req.body.BolumID;
  var Tarih = req.body.Date;
  var GectiMi = req.body.GectiMi;
  con.query("SELECT COUNT(*) AS count FROM oynananbolumler WHERE KullaniciID=? AND BolumID=?", [KullaniciID, BolumID], function (err, result) {
    if (result[0].count > 0) {
      con.query("SELECT GectiMi FROM oynananbolumler WHERE KullaniciID = ? AND BolumID = ?", [KullaniciID, BolumID], function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result[0].GectiMi);
        if (result[0].GectiMi) {
          res.json({
            message: "Zaten Bu Bölümü Geçmiş"
          });
        } else {
          con.query("UPDATE oynananbolumler SET GectiMi = ? , Tarih = ? WHERE KullaniciID = ? AND BolumID = ?", [GectiMi, Tarih, KullaniciID, BolumID], function (err, result) {
            res.json({
              message: "succes"
            });
          });
        }
      });
    } else {
      con.query("INSERT INTO oynananbolumler (KullaniciID,BolumID,Tarih,GectiMi) VALUES (?,?,?,?)", [KullaniciID, BolumID, Tarih, GectiMi], function (err, result) {
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
  con.query("SELECT * FROM bolum INNER JOIN oynananbolumler ON bolum.BolumID = oynananbolumler.BolumID WHERE bolum.SezonID = ? AND oynananbolumler.KullaniciID = ? AND oynananbolumler.GectiMi = 1 ORDER BY bolum.Order", [SezonID, KullaniciID], function (err, result) {
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
  var Tarih = req.body.Date;
  con.query("SELECT COUNT(*) AS count FROM gecilensezonlar WHERE KullaniciID=? AND SezonID=?", [KullaniciID, SezonID], function (err, result) {
    if (result[0].count > 0) {
      res.json({
        message: "failed"
      });
    } else {
      con.query("INSERT INTO gecilensezonlar (KullaniciID,SezonID,Tarih) VALUES (?,?,?)", [KullaniciID, SezonID, Tarih], function (err, result) {
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
  console.log("a " + KullaniciID);
  console.log("b " + SezonID);

  // SezonID ile bölümleri al
  con.query("SELECT * FROM bolum WHERE SezonID = ?", [SezonID], function (err, bolumlerResult) {
    if (err) {
      return res.status(500).json({
        message: "Bölümleri alırken hata oluştu."
      });
    }

    // Geçilen bölümleri al
    con.query("SELECT * FROM oynananbolumler WHERE KullaniciID = ? AND GectiMi = 1", [KullaniciID], function (err, gecilenBolumlerResult) {
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
router.post("/GunlukGiris", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var Date = req.body.Date;
  con.query("SELECT COUNT(*) as count FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Date], function (err, result) {
    if (err) {
      console.error("Hata:", err);
      return res.status(500).json({
        error: "Veritabanı hatası."
      });
    }
    if (result[0].count > 0) {
      res.json(false);
    } else {
      con.query("INSERT INTO gunlukgiris (KullaniciID,Tarih) VALUES (?,?)", [KullaniciID, Date], function (err, result) {
        if (err) {
          console.error("Hata:", err);
          return res.status(500).json({
            error: "Veritabanı hatası."
          });
        }
        return res.json(true); // Yeni giriş başarılı
      });
    }
  });
});

router.get("/GunlukGiris", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  console.log(KullaniciID);
  con.query("SELECT * FROM gunlukgiris WHERE KullaniciID = ?", [KullaniciID], function (err, result) {
    if (err) {
      console.error("Hata:", err);
      return res.status(500).json({
        error: "Veritabanı hatası."
      });
    }
    res.json({
      message: result
    });
  });
});
router.get("/temelKategoriler", function (req, res) {
  var con = getDb.getConnection();
  var AnaDilID = req.query.AnaDilID;
  var HangiDilID = req.query.HangiDilID;
  con.query("SELECT tk.id,tkc.Ceviri,tk.value,tk.Image FROM temelkategoriceviri tkc INNER JOIN temelkategoriler tk ON tk.id = tkc.KelimeID WHERE AnaDilID =? and HangiDilID = ?", [AnaDilID, HangiDilID], function (err, result) {
    if (err) {
      throw err;
    }
    return res.json({
      message: result
    });
  });
});
router.get("/temelBolumler", function (req, res) {
  var con = getDb.getConnection();
  var AnaDilID = req.query.AnaDilID;
  var HangiDilID = req.query.HangiDilID;
  var KategoriID = req.query.KategoriID;
  con.query("SELECT tb.id,tb.value,tbc.ceviri,tb.Order,tb.Image FROM temelbolumler tb INNER JOIN temelbolumlerceviri tbc ON tb.id = tbc.KelimeID WHERE tbc.AnaDilID =? and tbc.HangiDilID = ? and tb.KategoriID = ?", [AnaDilID, HangiDilID, KategoriID], function (err, result) {
    if (err) {
      throw err;
    }
    return res.json({
      message: result
    });
  });
});
router.get("/temelKelimeler", function (req, res) {
  var con = getDb.getConnection();
  var AnaDilID = req.query.AnaDilID;
  var HangiDilID = req.query.HangiDilID;
  var BolumID = req.query.BolumID;
  con.query("SELECT tk.id,tk.value,tkc.ceviri,tk.Image FROM temelkelimeler tk INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE tkc.AnaDilID = ? AND tkc.HangiDilID = ? AND tk.BolumID = ? ", [AnaDilID, HangiDilID, BolumID], function (err, result) {
    if (err) {
      throw err;
    }
    return res.json({
      message: result
    });
  });
});
router.post("/OynananTemelOyun", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var BolumID = req.body.BolumID;
  var KategoriID = req.body.KategoriID;
  var Tarih = req.body.Date;
  var GectiMi = req.body.GectiMi;
  con.query("SELECT COUNT(*) as count FROM oynanantemelbolumler WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ?", [KullaniciID, BolumID, KategoriID], function (err, result) {
    if (err) {
      throw err;
    }
    if (result[0].count) {
      con.query("SELECT GectiMi FROM oynanantemelbolumler WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ? and Tarih = ?", [KullaniciID, BolumID, KategoriID, Tarih], function (err, result) {
        if (err) {
          throw err;
        }
        if (result[0].GectiMi) {
          res.json({
            message: "Bu Bölümü Daha Önce Geçmişsin"
          });
        } else {
          con.query("UPDATE oynanantemelbolumler SET GectiMi = ? , Tarih = ? WHERE KullaniciID = ? AND GecilenBolumID = ? AND KategoriID = ?", [GectiMi, Tarih, KullaniciID, BolumID, KategoriID], function (err, result) {
            if (err) {
              throw err;
            }
            res.json({
              message: "succes"
            });
          });
        }
      });
    } else {
      con.query("INSERT INTO oynanantemelbolumler (GecilenBolumID,KategoriID,KullaniciID,Tarih,GectiMi) values(?,?,?,?,?)", [BolumID, KategoriID, KullaniciID, Tarih, GectiMi], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "succes"
        });
      });
    }
  });
});
router.get("/temelGecilenBolum", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  con.query("SELECT gtb.GecilenBolumID,tb.KategoriID,gtb.KullaniciID,tb.Order FROM oynanantemelbolumler gtb INNER JOIN temelbolumler tb ON gtb.GecilenBolumID = tb.id WHERE KullaniciID = ? AND GectiMi = 1", [KullaniciID], function (err, result) {
    if (err) throw err;
    res.json({
      message: result
    });
  });
});
router.post("/temelSozluk", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var KelimeID = req.body.KelimeID;
  var Tarih = req.body.Date;
  con.query("SELECT COUNT(*) AS count FROM temelkelimelersozluk WHERE KelimeID = ? AND KullaniciID = ?", [KelimeID, KullaniciID], function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result[0].count);
    if (result[0].count == 0) {
      con.query("INSERT INTO temelkelimelersozluk (KelimeID,KullaniciID,Tarih) values(?,?,?)", [KelimeID, KullaniciID, Tarih], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "Sözlüğe Eklendi"
        });
      });
    } else {
      res.json({
        message: "Zaten Sözlüğe Eklenmiş"
      });
    }
  });
});
router.get("/temelSozluk", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  con.query("SELECT tk.id,tk.value,tkc.Ceviri,tk.Image FROM temelkelimelersozluk tks INNER JOIN temelkelimeler tk ON tks.KelimeID = tk.id INNER JOIN temelkelimelerceviri tkc ON tkc.KelimeID = tk.id WHERE tks.KullaniciID = ?", [KullaniciID], function (err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json({
      message: result
    });
  });
});
router["delete"]("/temelSozluk", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var KelimeID = req.query.KelimeID;
  con.query("DELETE FROM temelkelimelersozluk WHERE KullaniciID = ? AND KelimeID = ?", [KullaniciID, KelimeID], function (err, result) {
    if (err) {
      throw err;
    }

    // Silme işleminin başarılı olup olmadığını kontrol et
    if (result.affectedRows > 0) {
      res.json({
        message: "Başarıyla Silindi"
      });
    } else {
      res.status(404).json({
        message: "Silinecek kayıt bulunamadı"
      });
    }
  });
});
router.get("/temelIlerleme", function (req, res) {
  /* temel eğitimdeki ilerleme barı */
  var con = getDb.getConnection();
  var id = req.query.id;
  con.query("SELECT COUNT(*) AS count FROM temelBolumler", function (err, result) {
    if (err) {
      throw err;
    }
    var bolumSayisi = result[0].count;
    con.query("SELECT COUNT(*) AS count FROM oynanantemelbolumler WHERE KullaniciID = ? and GectiMi = 1", [id], function (err, results) {
      if (err) {
        throw err;
      }
      var gecilenBolumSayisi = results[0].count;
      res.json({
        bolumSayisi: bolumSayisi,
        gecilenBolumSayisi: gecilenBolumSayisi
      });
    });
  });
});
router.get("/egzersiz", function (req, res) {
  var con = getDb.getConnection();
  con.query("SELECT * FROM egzersiz", function (err, result) {
    if (err) {
      throw err;
    }
    res.json({
      message: result
    });
  });
});
router.post("/yanlisBilinenKelime", function (req, res) {
  /* yanlis bilinen kelime kaydetme */
  var con = getDb.getConnection();
  var KelimeID = req.body.KelimeID;
  var KullaniciID = req.body.KullaniciID;
  var TemelMi = req.body.TemelMi;
  var Tarih = req.body.Date;
  con.query("SELECT COUNT(*) as count FROM yanlisbilinenkelimeler WHERE KelimeID = ? AND KullaniciID = ?", [KelimeID, KullaniciID], function (err, result) {
    if (err) {
      throw err;
    }
    var count = result[0].count;
    if (count > 0) {
      res.json({
        message: "Zaten Ekli"
      });
    } else {
      con.query("INSERT INTO yanlisbilinenkelimeler (KelimeID,KullaniciID,temelMi,aktifMi,Tarih) values(?,?,?,1,?)", [KelimeID, KullaniciID, TemelMi, Tarih], function (err, result) {
        if (err) {
          throw err;
        }
        if (result.affectedRows > 0) {
          res.json({
            message: "Başarıyla Eklendi"
          });
        } else {
          res.status(404).json({
            message: "Bir Hata Var"
          });
        }
      });
    }
  });
});
router.get("/yanlisBilinenKelime", function (req, res) {
  /* yanlis bilinen kelime getirme */
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var TemelMi = req.query.TemelMi;
  console.log(TemelMi);
  console.log(TemelMi);
  if (TemelMi == 1) {
    con.query("SELECT ybk.KelimeID,ybk.KullaniciID,tk.value,tkc.Ceviri,tk.Image FROM yanlisbilinenkelimeler ybk INNER JOIN temelkelimeler tk ON ybk.KelimeID = tk.id INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE ybk.KullaniciID = ? AND ybk.temelMi = 1 AND ybk.aktifMi=1", [KullaniciID], function (err, result) {
      if (err) {
        throw err;
      }
      res.json({
        message: result
      });
    });
  } else if (TemelMi == 0) {
    con.query("SELECT ybk.KullaniciID, ybk.KelimeID, ak.Value, c.Ceviri FROM yanlisbilinenkelimeler ybk INNER JOIN anakelimeler ak ON ybk.KelimeID = ak.AnaKelimelerID INNER JOIN ceviriler c ON c.AnaKelimeID = ak.AnaKelimelerID WHERE ybk.KullaniciID = ? AND ybk.TemelMi = 0 AND ybk.aktifMi=1", [KullaniciID], function (err, result) {
      if (err) {
        throw err;
      }
      res.json({
        message: result
      });
    });
  }
});
router.put("/yanlisBilinenKelime", function (req, res) {
  /* yanlis bilinen kelime silme(değiştirme aktifliği) */
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var KelimeID = req.body.KelimeID;
  var temelMi = req.body.temelMi;
  console.log(KelimeID);
  console.log(temelMi);
  console.log(KullaniciID);
  con.query("UPDATE yanlisbilinenkelimeler ybk SET ybk.aktifMi = 0 WHERE ybk.kullaniciID = ? AND ybk.KelimeID = ? AND ybk.temelMi=?", [KullaniciID, KelimeID, temelMi], function (err, result) {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.json({
        message: "Başarıyla Değişti"
      });
    } else {
      res.status(404).json({
        message: "Bir Hata Var"
      });
    }
  });
});
router.get("/dinlemeEgzersizi", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var temelMi = req.query.temelMi;
  var AnaDilID = req.query.AnaDilID;
  var HangiDilID = req.query.HangiDilID;
  var MeslekID = req.query.MeslekID;
  if (temelMi == 0) {
    con.query("SELECT ak.AnaKelimelerID AS id , ak.Value ,c.Ceviri FROM anakelimeler ak INNER JOIN ceviriler c ON ak.AnaKelimelerID = c.AnaKelimeID WHERE ak.test = 1 AND c.AnaDilID = ?  AND c.HangiDilID = ? AND ak.MeslekID = ?", [AnaDilID, HangiDilID, MeslekID], function (err, result) {
      if (err) throw err;
      res.json({
        message: result
      });
    });
  } else if (temelMi == 1) {
    con.query("SELECT tk.id,tk.value,tkc.Ceviri FROM temelkelimeler tk INNER JOIN temelkelimelerceviri tkc ON tk.id = tkc.KelimeID WHERE tkc.AnaDilID = ? AND tkc.HangiDilID = ?", [AnaDilID, HangiDilID], function (err, result) {
      if (err) throw err;
      res.json({
        message: result
      });
    });
  }
});
router.post("/GunlukGorevSozluk", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var Date = req.body.Date;
  var SozlugeGiris = req.body.SozlugeGiris;
  con.query("SELECT COUNT(*) as count FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Date], function (err, result) {
    if (err) {
      return res.status(500).json({
        error: "Veritabanı hatası burda."
      });
    }
    if (result[0].count > 0) {
      con.query("UPDATE gunlukgiris SET SozlukGiris = ? WHERE KullaniciID = ? AND Tarih = ?", [SozlugeGiris, KullaniciID, Date], function (err, result) {
        if (err) {
          return res.status(500).json({
            error: "Veritabanı hatası. şurda"
          });
        }
        return res.json(true);
      });
    } else {
      res.json(false);
    }
  });
});
router.post("/GunlukGorevHata", function (req, res) {
  /* hataları gözden geçirme ekranaına baktıysa bu api çalışcak */
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var Tarih = req.body.Date;
  con.query("SELECT COUNT(*) AS count FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) {
      throw err;
    }
    if (result[0].count) {
      con.query("UPDATE gunlukgorev SET HataEgzersiz=1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "succes"
        });
      });
    } else {
      con.query("INSERT INTO gunlukgorev (KullaniciID,Tarih,HataEgzersiz) values(?,?,?)", [KullaniciID, Tarih, 1], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "succes"
        });
      });
    }
  });
});
router.post("/GunlukGorevEgzersiz", function (req, res) {
  /* egzersiz yaparsa kaydetcek */
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var Tarih = req.body.Date;
  con.query("SELECT COUNT(*) as count FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) {
      throw err;
    }
    if (result[0].count) {
      con.query("UPDATE gunlukgorev SET Egzersiz=1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "succes"
        });
      });
    } else {
      con.query("INSERT INTO gunlukgorev (KullaniciID,Tarih,Egzersiz) values(?,?,?)", [KullaniciID, Tarih, 1], function (err, result) {
        if (err) {
          throw err;
        }
        res.json({
          message: "succes"
        });
      });
    }
  });
});
router.get("/MeslekiEgitimKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var Tarih = req.query.Date;
  con.query("SELECT COUNT(*) as count FROM oynananbolumler WHERE KullaniciID = ? AND Tarih = ? AND GectiMi = 1", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    res.json({
      message: result[0].count
    });
  });
});
router.get("/TemelEgitimKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var Tarih = req.query.Date;
  con.query("SELECT COUNT(*) AS count FROM oynanantemelbolumler WHERE  KullaniciID = ? AND Tarih = ? AND GectiMi = 1", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    res.json({
      message: result[0].count
    });
  });
});
router.get("/SozlukTekrariKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var Tarih = req.query.Date;
  con.query("SELECT SozlukGiris FROM gunlukgiris WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    if (!result || result.length === 0) {
      res.json({
        message: 0
      });
    } else {
      var _result$, _result$2;
      console.log(((_result$ = result[0]) === null || _result$ === void 0 ? void 0 : _result$.SozlukGiris) || 0);
      res.json({
        message: ((_result$2 = result[0]) === null || _result$2 === void 0 ? void 0 : _result$2.SozlukGiris) || 0
      });
    }
  });
});
router.get("/GunlukGorevHataKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var Tarih = req.query.Date;
  con.query("SELECT HataEgzersiz FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    if (!result || result.length === 0) {
      res.json({
        message: 0
      });
    } else {
      var _result$3, _result$4;
      console.log(((_result$3 = result[0]) === null || _result$3 === void 0 ? void 0 : _result$3.HataEgzersiz) || 0);
      res.json({
        message: ((_result$4 = result[0]) === null || _result$4 === void 0 ? void 0 : _result$4.HataEgzersiz) || 0
      });
    }
  });
});
router.get("/GunlukGorevEgzersizKontrol", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  var Tarih = req.query.Date;
  con.query("SELECT Egzersiz FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    if (!result || result.length === 0) {
      res.json({
        message: 0
      });
    } else {
      var _result$5, _result$6;
      console.log(((_result$5 = result[0]) === null || _result$5 === void 0 ? void 0 : _result$5.Egzersiz) || 0);
      res.json({
        message: ((_result$6 = result[0]) === null || _result$6 === void 0 ? void 0 : _result$6.Egzersiz) || 0
      });
    }
  });
});
router.post("/GunlukGorevTamamlandi", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var Tarih = req.body.Date;
  con.query("SELECT TamamlandiMi FROM gunlukgorev WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
    if (err) throw err;
    console.log(result);

    // Eğer sonuç boşsa, UPDATE işlemini yap
    if (!result || result.length === 0 || result[0].TamamlandiMi === null) {
      con.query("UPDATE gunlukgorev SET TamamlandiMi = 1 WHERE KullaniciID = ? AND Tarih = ?", [KullaniciID, Tarih], function (err, result) {
        if (err) throw err;
        res.json({
          message: "success"
        });
      });
    } else {
      res.json({
        message: "failed"
      });
    }
  });
});
router.get("/Test", function (req, res) {
  var con = getDb.getConnection();
  var MeslekID = req.query.MeslekID;
  var DilID = req.query.DilID;
  var OgrencegiDilID = req.query.OgrencegiDilID;
  con.query("CALL TestOlusturma(?,?,?)", [MeslekID, DilID, OgrencegiDilID], function (err, result) {
    if (err) throw err;
    res.json({
      message: result
    });
  });
});
router.post("/test", function (req, res) {
  var con = getDb.getConnection();
  var name = req.body.Name;
  var Tarih = req.body.Date;
  con.query("INSERT INTO test (GirilenAd,Tarih) values(?,?)", [name, Tarih], function (err, result) {
    if (err) throw err;
    res.json({
      success: true,
      id: result.insertId
    });
  });
});
router.post("/TestSorulari", function (req, res) {
  var con = getDb.getConnection();
  var TestID = req.body.TestID;
  var KelimeID = req.body.KelimeID;
  var dogruMu = req.body.dogruMu;
  con.query("INSERT INTO testsorulari (TestID,KelimeID,dogruMu) values(?,?,?)", [TestID, KelimeID, dogruMu], function (err, result) {
    if (err) throw err;
    res.json({
      message: "succes"
    });
  });
});
router.post("/TestIDKaydet", function (req, res) {
  var con = getDb.getConnection();
  var TestID = req.body.TestID;
  var KullaniciID = req.body.KullaniciID;
  con.query("SELECT TestID FROM kullanici WHERE id = ?", [KullaniciID], function (err, result) {
    if (err) {
      return res.status(500).json({
        status: "ERROR",
        message: "Veritabanı hatası",
        error: err
      });
    }

    // Kullanıcı bulunamadıysa
    if (result.length === 0) {
      return res.status(404).json({
        status: "ERROR",
        message: "Kullanıcı bulunamadı"
      });
    }
    con.query("SELECT TestID FROM kullanici WHERE id = ?", [KullaniciID], function (err, result) {
      if (err) {
        return res.status(500).json({
          status: "ERROR",
          message: "Veritabanı hatası",
          error: err
        });
      }

      // Eğer daha önce TestID varsa, işlem yapılmasın
      if (result[0] && result[0].TestID !== null) {
        return res.json({
          status: "FAIL",
          message: "Zaten test yapmışsınız."
        });
      }

      // TestID daha önce kaydedilmemişse, güncelleme işlemi yapılacak
      con.query("UPDATE kullanici SET TestID = ? WHERE id = ?", [TestID, KullaniciID], function (updateErr) {
        if (updateErr) {
          return res.status(500).json({
            status: "ERROR",
            message: "TestID kaydedilirken hata oluştu",
            error: updateErr
          });
        }
        return res.json({
          status: "SUCCESS",
          message: "TestID başarıyla kaydedildi."
        });
      });
    });
  });
});
router.get("/TestSonucu", function (req, res) {
  var con = getDb.getConnection();
  var KullaniciID = req.query.KullaniciID;
  console.log(KullaniciID);
  con.query("SELECT k.TestID, ak.AnaKelimelerID,ts.dogruMu,sv.SeviyeAdi,sv.Order FROM kullanici k INNER JOIN testsorulari ts ON k.TestID = ts.TestID INNER JOIN anakelimeler ak ON ts.KelimeID = ak.AnaKelimelerID INNER JOIN bolum b ON ak.BolumID = b.BolumID INNER JOIN sezon s ON b.SezonID = s.SezonID INNER JOIN seviye sv ON s.SeviyeID = sv.SeviyeID WHERE k.id = ? ORDER BY sv.Order asc", [KullaniciID], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json({
      message: result
    });
  });
});
router.post("/Egzersiz", function (req, res) {
  /* yapılan egzersizleri kaydeden endpoint */
  var con = getDb.getConnection();
  var KullaniciID = req.body.KullaniciID;
  var TemelMi = req.body.TemelMi;
  var EgzersizID = req.body.EgzersizID;
  var KelimeID = req.body.KelimeID;
  var DogruMu = req.body.DogruMu;
  con.query("SELECT COUNT(*) as count FROM egzersizistatistikleri WHERE KullaniciID = ? AND EgzersizID = ?  AND KelimeID = ? AND TemelMi = ?", [KullaniciID, EgzersizID, KelimeID, TemelMi], function (err, result) {
    if (err) throw err;
    console.log("egzersiz istatistik = " + result[0].count);
    if (result[0].count > 0) {
      con.query("UPDATE egzersizistatistikleri SET DogruMu = ? WHERE KullaniciID = ? AND EgzersizID = ? AND KelimeID = ? AND TemelMi = ?", [DogruMu, KullaniciID, EgzersizID, KelimeID, TemelMi], function (err, result) {
        if (err) throw err;
        res.json({
          message: "Degistirildi"
        });
      });
    } else {
      con.query("INSERT INTO egzersizistatistikleri (KullaniciID,TemelMi,EgzersizID,KelimeID,DogruMu) values(?,?,?,?,?)", [KullaniciID, TemelMi, EgzersizID, KelimeID, DogruMu], function (err, result) {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.json({
            message: "Eklendi"
          });
        } else {
          res.json({
            message: "Ekleme Hatasi"
          });
        }
      });
    }
  });
});
module.exports = router;